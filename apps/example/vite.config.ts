import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@salesflow/ui-components": path.resolve(
        __dirname,
        "../../packages/ui-components/src"
      ),
      "@salesflow/utils": path.resolve(__dirname, "../../packages/utils/src"),
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});
