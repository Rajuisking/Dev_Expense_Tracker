import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Proxy API calls to backend so you don't need full URL in dev
    proxy: {
      "/api": {
        target: "https://dev-expense-tracker-ves6.onrender.com",
        changeOrigin: true,
      },
    },
  },
});
