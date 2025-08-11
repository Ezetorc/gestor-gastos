import { defineConfig, mergeConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import viteConfig from "./vitest.config";

export default defineConfig(
  mergeConfig(viteConfig, {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  })
);
