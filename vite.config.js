import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __VITE_APP_SUPABASE_URL__: `"${process.env.VITE_APP_SUPABASE_URL}"`, // wrapping in "" since it's a string
    __VITE_APP_ANON_KEY__: `"${process.env.VITE_APP_ANON_KEY}"`,
  },
  server: {
    proxy: {
      "/api": {
        port: 4000,
        target: "http://localhost:4000",
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
    },
  },
  assetsInclude: ["**/*.glb"],
});
