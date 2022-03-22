import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { viteMockServe } from "vite-plugin-mock";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteMockServe({ supportTs: true })],
  server: {
    host: "0.0.0.0", // 解决 use `--host` to expose
    port: 8080,
    open: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  // 配置别名
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "src"),
      },
    ],
  },
});
