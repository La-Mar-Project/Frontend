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
    },
  },
});
