import { defineConfig, type ConfigEnv,loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
//引入svg需要用的插件
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

import { viteMockServe } from "vite-plugin-mock";

// https://vite.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv) => {
  //获取各个环境下对应的变量
  let env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]",
      }),
      viteMockServe({
        // default
        mockPath: "mock",
        enable: command === "serve", // 使用 enable 替代 localEnabled
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // CSS 预处理器配置
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variable.scss";`,
        },
      },
    },
    //代理跨域
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          //获取数据的服务器地址设置
          target: env.VITE_SERVE,
          //需要代理跨域
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
  });
