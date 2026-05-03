import { defineConfig } from "astro/config";
import rehypePrefixBase from "./src/plugins/rehype-prefix-base.mjs";

const base = process.env.ASTRO_PREVIEW_BASE || "/";

export default defineConfig({
  site: "https://lightscamerateach.com",
  base,
  markdown: {
    rehypePlugins: [[rehypePrefixBase, { base }]],
  },
});
