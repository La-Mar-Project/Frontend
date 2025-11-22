import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://jjubul.duckdns.org",
        changeOrigin: true,
        secure: false,
        // /api/users → /users 로 보내기
        rewrite: (path) => path.replace(/^\/api/, ""),
      },

      "/auth": {
        target: "https://jjubul-auth.duckdns.org",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
