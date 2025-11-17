import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/ics/kr": {
        target: "https://calendars.icloud.com",
        changeOrigin: true,
        secure: true,
        rewrite: () => "/holidays/kr_ko.ics",
        // iCloud는 경로 고정이므로 rewrite 불필요
        // 헤더를 강제로 붙여주면 dev에서 더 편함
        configure: (proxy) => {
          proxy.on("proxyRes", (proxyRes) => {
            proxyRes.headers["access-control-allow-origin"] = "*";
            proxyRes.headers["content-type"] = "text/calendar; charset=utf-8";
          });
        },
      },
      "/api": {
        target: "https://jjubul.duckdns.org",
        changeOrigin: true,
        secure: false, // https 자체서명일 때만 false, 정식 인증서면 true 또는 삭제
        rewrite: (path) => path.replace(/^\/api/, ""), // /api 제거하고 백엔드로 전달
      },
    },
  },
});
