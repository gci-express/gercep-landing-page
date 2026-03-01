// @ts-check

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const site =
  process.env.SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

/** Rewrite /tracking/:awb to /tracking in dev server */
const TRACKING_URL_REGEX = /^\/tracking\/.+/;

function trackingRewritePlugin() {
  return {
    name: "tracking-rewrite",
    configureServer(/** @type {import('vite').ViteDevServer} */ server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url && TRACKING_URL_REGEX.test(req.url)) {
          req.url = "/tracking";
        }
        next();
      });
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [react()],
  vite: {
    plugins: [tailwindcss(), trackingRewritePlugin()],
  },
});
