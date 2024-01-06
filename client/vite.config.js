import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugIn = {
  registerType: "prompt",
  includeAssests: ["favicon.ico", "apple-touc-icon.png", "masked-icon.svg"],
  manifest: {
    name: "Tweeter",
    short_name: "Tweeter",
    description: "A social platform to connect, post and chat with people.",
    icons: [
      {
        src: "/assets/Tweeter.svg",
        sizes: "192x192",
        type: "image/png",
        purpose: "favicon",
      },
      {
        src: "/assets/Tweeter.svg",
        sizes: "512x512",
        type: "image/png",
        purpose: "favicon",
      },
      {
        src: "/assets/Tweeter.svg",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon",
      },
      {
        src: "/assets/Tweeter.svg",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    theme_color: "#3B82F6",
    background_color: "#121D2D",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
});
