import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Exclude Fast Refresh File
      // exclude: /src\/.+\.(t|j)sx?$/,
    }),
  ],
});
