import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config({
  path: "../.env",
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __VITE_APP_SUPABASE_URL__: `"${process.env.VITE_APP_SUPABASE_URL}"`, // wrapping in "" since it's a string
    __VITE_APP_ANON_KEY__: `"${process.env.VITE_APP_ANON_KEY}"`,
    __VITE_APP_API_URL__: `"${process.env.VITE_APP_API_URL}"`,
  },
  server: {
    proxy: {
      "/api": {
        port: 4000,
        target: process.env.VITE_APP_API_URL || "http://localhost:4000",
        changeOrigin: true,
        secure: false,
        ws: false,
      },
    },
    open: true,
  },
  resolve: {
    alias: {
      "@": "/src",
      "./promises": "ably/build/ably.js",
    },
  },
  assetsInclude: ["**/*.glb"],
  optimizeDeps: {
    exclude: ["express"],
  },
});
