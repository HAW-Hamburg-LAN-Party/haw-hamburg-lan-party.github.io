# HAW-LAN Website

This is the repo for the official [https://haw-lan.de](https://haw-lan.de) website.

## Edit Content

- To edit Site content just go in `/src/pages` and edit the files.
  - To create a new Site, simple create a `.md` file in the directory.
  - To add images or other assets, add these in `./images` and refer to them by the filename.

To learn more about the folder structure of an Astro project, refer to [the guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## Adding new archives

1. Copy `src/content/archive/volumeYY.md` and rename it to `src/content/archive/volumeXX.md`
1. Create a folder called `src/content/archive/images/volumeXX`
1. Add the images for the archive in this folder
1. Run `uv run clean_and_normalize_images.py src/content/archive/images/volumeXX` to clean and normalize the images
1. Remove the temp_dir folder created by the script in `src/content/archive/images/volumeXX/temp_dir`
1. Check whether it works by running `npm run dev`
1. Push everything to the repo and be happy :)

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
