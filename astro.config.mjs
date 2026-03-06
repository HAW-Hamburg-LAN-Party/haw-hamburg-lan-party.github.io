// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";

// https://astro.build/config
export default defineConfig({
  site: "https://haw-lan.de",
  output: "static",
  integrations: [tailwind(), mdx(), sitemap()],
  image: {
    responsiveStyles: true,
    layout: "constrained",
  },
  experimental: {
    svgo: true,
  },
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          content: svgIcon,
        },
      ],
      [
        rehypeExternalLinks,
        {
          rel: ["noopener"],
          target: "_blank",
        },
      ],
    ],
  },
});
