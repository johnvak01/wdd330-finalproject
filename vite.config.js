import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/html/index.html"),
        browse: resolve(__dirname, "src/html/browse.html"),
        wishlist: resolve(__dirname, "src/html/wishlist.html"),
        itinerary: resolve(__dirname, "src/html/itinerary.html")
        
      },
    },
  },
});
