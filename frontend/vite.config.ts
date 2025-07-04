import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Emit static assets directly into the Spring Boot static folder
    outDir: resolve(__dirname, "../backend/src/main/resources/static"),
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    open: true,
    // Proxy API calls to Spring Boot backend (running on 8080 by default)
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
});
