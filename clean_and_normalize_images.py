#!/usr/bin/env python3
# /// script
# requires-python = ">=3.14"
# dependencies = [
#     "pathlib>=1.0.1",
#     "pillow>=12.2.0",
# ]
# ///
"""
Normalize image filenames and preserve image metadata.
This script is largely AI generated, sorry, be warned.

Usage:
    uv run clean_and_normalize_images.py <directory>
    (Any PEP 728 compliant thing should work tho)
"""

import os
import sys
from pathlib import Path
import io
import shutil
from PIL import Image
from PIL.Image import Exif

def clean_and_rename_images(directory: str) -> None:
    """
    Rename images in a directory sequentially while preserving metadata such as EXIF orientation.
    
    Args:
        directory: Path to the directory containing images
    """
    # Supported image extensions
    image_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'}
    
    # Get all image files
    image_dir = Path(directory)
    if not image_dir.exists() or not image_dir.is_dir():
        print(f"Error: Directory '{directory}' does not exist")
        sys.exit(1)
    
    image_files = sorted([
        f for f in image_dir.iterdir()
        if f.is_file() and f.suffix.lower() in image_extensions
    ])
    
    if not image_files:
        print(f"No image files found in '{directory}'")
        return
    
    print(f"Found {len(image_files)} image(s) to process")
    # Temporary folder to store original images to avoid accidental overwrite
    tmp_dir = image_dir / "tmp_originals"
    tmp_dir.mkdir(exist_ok=True)
    
    for index, image_path in enumerate(image_files, start=1):
        try:
            # copy original to tmp folder to avoid overwriting
            try:
                shutil.copy2(image_path, tmp_dir / image_path.name)
            except Exception:
                # non-fatal; continue and still process
                pass

            # Open image
            img = Image.open(tmp_dir / image_path.name)

            # remove original file to avoid confusion; we have a backup in tmp_originals
            try:
                image_path.unlink()
            except Exception:
                # non-fatal; continue and still process
                pass
            
            image_to_save = img.copy()
            exif = img.info.get("exif")
            icc_profile = img.info.get("icc_profile")

            # Target max size in bytes (0.5 MB)
            TARGET_SIZE = 500_000

            def _save_bytes(img_obj, format_name, save_kwargs):
                buf = io.BytesIO()
                img_obj.save(buf, format_name, **save_kwargs)
                return buf.getvalue()

            def compress_and_save(path: Path, img_obj: Image.Image, ext: str) -> None:
                """Try to save the image so the resulting file is <= TARGET_SIZE.
                Uses iterative quality/quantize strategies depending on format.
                This is best-effort and will preserve the original extension when possible.
                """
                ext_l = ext.lower()
                # JPEG-family: binary search on quality
                if ext_l in {'.jpg', '.jpeg'}:
                    # ensure RGB for JPEG
                    to_save = img_obj.convert('RGB') if img_obj.mode not in ('L', 'RGB') else img_obj
                    low, high = 20, 95
                    best_bytes = None
                    while low <= high:
                        mid = (low + high) // 2
                        save_kwargs = {"quality": mid, "optimize": True}
                        if exif:
                            save_kwargs["exif"] = exif
                        if icc_profile:
                            save_kwargs["icc_profile"] = icc_profile
                        try:
                            data = _save_bytes(to_save, 'JPEG', save_kwargs)
                        except OSError:
                            # some images may fail optimize at high/low qualities
                            save_kwargs.pop('optimize', None)
                            data = _save_bytes(to_save, 'JPEG', save_kwargs)
                        size = len(data)
                        if size <= TARGET_SIZE:
                            best_bytes = data
                            low = mid + 1
                        else:
                            high = mid - 1
                    if best_bytes:
                        path.write_bytes(best_bytes)
                        return
                    # fallback: save with lowest reasonable quality
                    fallback_kwargs = {"quality": 20}
                    if exif:
                        fallback_kwargs["exif"] = exif
                    if icc_profile:
                        fallback_kwargs["icc_profile"] = icc_profile
                    to_save.save(path, 'JPEG', **fallback_kwargs)
                    return

                # WebP: try decreasing quality
                if ext_l == '.webp':
                    for q in range(95, 15, -5):
                        save_kwargs = {"quality": q}
                        if icc_profile:
                            save_kwargs["icc_profile"] = icc_profile
                        data = _save_bytes(img_obj, 'WEBP', save_kwargs)
                        if len(data) <= TARGET_SIZE:
                            path.write_bytes(data)
                            return
                    # final best-effort
                    img_obj.save(path, 'WEBP', quality=20)
                    return

                # PNG and others: try optimize and quantize
                if ext_l == '.png':
                    # try optimized PNG first
                    try:
                        data = _save_bytes(img_obj, 'PNG', {"optimize": True})
                        if len(data) <= TARGET_SIZE:
                            path.write_bytes(data)
                            return
                    except Exception:
                        pass
                    # Try quantizing to reduce colors
                    for colors in (256, 128, 64, 32, 16):
                        try:
                            q = img_obj.convert('P', palette=Image.ADAPTIVE, colors=colors)
                            data = _save_bytes(q, 'PNG', {"optimize": True})
                            if len(data) <= TARGET_SIZE:
                                path.write_bytes(data)
                                return
                        except Exception:
                            continue
                    # fallback: save original (may be > TARGET_SIZE)
                    img_obj.save(path, 'PNG')
                    return

                # GIF, BMP, and other formats: attempt a simple save, and for large files convert to webp as last resort
                try:
                    data = _save_bytes(img_obj, img_obj.format or 'PNG', {})
                    if len(data) <= TARGET_SIZE:
                        path.write_bytes(data)
                        return
                except Exception:
                    pass
                # Last resort: convert to WebP (loses some metadata/transparency handling)
                try:
                    data = _save_bytes(img_obj, 'WEBP', {"quality": 80})
                    if len(data) <= TARGET_SIZE:
                        path.write_bytes(data)
                        return
                except Exception:
                    pass
                # final fallback: save as original format without compression
                try:
                    img_obj.save(path)
                except Exception:
                    # if everything fails, write raw bytes by copying
                    with open(path, 'wb') as out_f, open(image_path, 'rb') as in_f:
                        out_f.write(in_f.read())
            
            # Get file extension
            ext = image_path.suffix.lower()

            # Create new filename
            new_filename = f"{index}{ext}"
            new_path = image_dir / new_filename

            # Save while attempting to respect metadata and target size
            if ext in {'.jpg', '.jpeg'}:
                # initial save with high quality, then compress if needed
                save_kwargs = {"quality": 95}
                if exif:
                    save_kwargs["exif"] = exif
                if icc_profile:
                    save_kwargs["icc_profile"] = icc_profile
                try:
                    image_to_save.convert('RGB').save(new_path, 'JPEG', **save_kwargs)
                except Exception:
                    image_to_save.save(new_path, 'JPEG', **save_kwargs)
                # compress to target
                compress_and_save(new_path, image_to_save, ext)
            else:
                # attempt to save with metadata first
                save_kwargs = {}
                if exif:
                    save_kwargs["exif"] = exif
                if icc_profile:
                    save_kwargs["icc_profile"] = icc_profile
                try:
                    image_to_save.save(new_path, **save_kwargs)
                except Exception:
                    image_to_save.save(new_path)
                # try to compress/quantize if too large
                if new_path.exists() and new_path.stat().st_size > 500_000:
                    compress_and_save(new_path, image_to_save, ext)

            print(f"✓ {image_path.name} → {new_filename}")
            
            # Do not delete originals; originals are preserved in tmp_originals
        
        except Exception as e:
            print(f"✗ Error processing {image_path.name}: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: uv run clean_and_normalize_images.py <directory>")
        print("Example: uv run clean_and_normalize_images.py ./images")
        sys.exit(1)
    
    target_dir = sys.argv[1]
    clean_and_rename_images(target_dir)
