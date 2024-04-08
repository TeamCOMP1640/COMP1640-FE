/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import pluginRewriteAll from "vite-plugin-rewrite-all";
import tailwindcss from "tailwindcss";
import dotenv from "dotenv";

dotenv.config();
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [pluginRewriteAll(), react()],
    resolve: {
      alias: { "@app": path.resolve("./src") },
    },
    css: {
      postcss: {
        plugins: [tailwindcss],
      },
      preprocessorOptions: {
        scss: {
          additionalData: `
              @import "@app/assets/styles/_variable.scss";`,
        },
      },
    },
    server: {
      watch: {
        usePolling: true,
      },
      host: true,
      strictPort: true,
      port: 3001,
    },
    build: {
      terserOptions: {
        compress: {
          unused: false,
        },
      },
    },
  });
};
