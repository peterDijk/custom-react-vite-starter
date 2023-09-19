import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import visualizer from "rollup-plugin-visualizer";

const SERVER_PORT = 5050;

// https://vitejs.dev/config/
export default ({ mode }) =>
  defineConfig({
    plugins: [
      react(),
      viteTsconfigPaths(),
      mode === "visualizer" &&
        (visualizer({ open: true, gzipSize: true }) as PluginOption),
    ],
    server: {
      port: SERVER_PORT,
    },
    preview: {
      port: SERVER_PORT,
    },
    build: {
      minify: mode !== "development" ? "esbuild" : false,
      rollupOptions: {
        output: {
          dir: "dist",
          format: "iife",
          sourcemap: true,
          entryFileNames: "index.js",
        },
      },
    },
  });
