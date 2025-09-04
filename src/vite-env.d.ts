/// <reference types="vite/client" />

// 声明 Vue 文件模块
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// 声明 svg-icons 虚拟模块
declare module "virtual:svg-icons-register";
