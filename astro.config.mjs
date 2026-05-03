import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://lightscamerateach.com",
  base: process.env.ASTRO_PREVIEW_BASE || "/",
});
