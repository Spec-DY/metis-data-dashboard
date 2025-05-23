import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@data": path.resolve(__dirname, "./src/assets/data"),

      "@MH": path.resolve(__dirname, "./src/assets/screenshots/MH"),
      "@BC": path.resolve(__dirname, "./src/assets/screenshots/BC"),
      "@AB": path.resolve(__dirname, "./src/assets/screenshots/AB"),
      "@SK": path.resolve(__dirname, "./src/assets/screenshots/SK"),
      "@MB": path.resolve(__dirname, "./src/assets/screenshots/MB"),
      "@ON": path.resolve(__dirname, "./src/assets/screenshots/ON"),
    },
  },
  // development server
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});
