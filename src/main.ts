import { createApp } from "vue";
// import "./style.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
//引入所有图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";
// import SvgIcon from "./components/SvgIcon/index.vue";
const app = createApp(App);
//将所有图标注册为全局组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(ElementPlus, {
  locale: zhCn,
});
// app.component("SvgIcon", SvgIcon); //全局注册svg组件
// console.log(import.meta.env); 可以打印操作环境
import "virtual:svg-icons-register"; //引入svg
import globalComponent from "./components";
app.use(globalComponent); //便会触发index.ts中的install方法
import "element-plus/theme-chalk/dark/css-vars.css"; //暗黑模式

import router from "./router";
app.use(router);
import pinia from "./store";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
//测试登录假接口
// import axios from "axios";
// axios({
//   url: "/api/user/login",
//   method: "post",
//   data: {
//     username: "admin",
//     password: "111111",
//   },
// });
import "./permission"; //引入路由鉴权

app.mount("#app");
