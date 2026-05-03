import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const appNodeModules = fileURLToPath(new URL("./node_modules/", import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      react: `${appNodeModules}react`,
      "react/jsx-runtime": `${appNodeModules}react/jsx-runtime.js`,
      "react/jsx-dev-runtime": `${appNodeModules}react/jsx-dev-runtime.js`,
    },
  },
  esbuild: {
    jsx: "automatic",
  },
});
