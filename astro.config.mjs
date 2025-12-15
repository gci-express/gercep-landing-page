// @ts-check

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const site =
  process.env.SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
