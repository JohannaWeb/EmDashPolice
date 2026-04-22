import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import {fileURLToPath} from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({mode}) => {
  const vercelBuild = mode === "vercel" || process.env.VERCEL === "1";

  return {
    plugins: [react()],
    build: {
      outDir: vercelBuild
        ? path.resolve(__dirname, "dist")
        : path.resolve(__dirname, "../resources/META-INF/resources"),
      emptyOutDir: vercelBuild
    },
    server: {
      port: 5173,
      proxy: {
        "/api": "http://localhost:8080"
      }
    }
  };
});
