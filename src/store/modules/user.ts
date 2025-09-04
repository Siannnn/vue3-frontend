//创建用户相关小仓库
import { defineStore } from "pinia";
import { reqLogin, reqUserInfo } from "../../api/user";
import type { loginForm, loginResponseData } from "../../api/user/type";
//引入常量路由
import { constantRoute } from "../../router/routes";
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from "@/utils/token";

let useUserStore = defineStore("user", {
  state: () => {
    return {
      // token: localStorage.getItem("TOKEN"),
      token: GET_TOKEN(),
      menuRoutes: constantRoute, //菜单栏路由数据
      username: "",
      avatar: "",
    };
  },
  //处理异步方法
  actions: {
    //用户登录方法
    async userLogin(data: loginForm) {
      let result: loginResponseData = await reqLogin(data);

      // 因为响应拦截器返回了 response.data，所以需要类型断言
      const responseData = result;

      if (responseData.code === 200) {
        this.token = responseData.data.token;
        localStorage.setItem("TOKEN", responseData.data.token);
        return responseData; // 登录成功
      } else {
        console.log(
          "登录失败，code:",
          responseData.code,
          "错误信息:",
          responseData.message
        );
        throw new Error(responseData.message || "登录失败"); // 登录失败抛出错误
      }
    },
    async userInfo() {
      //获取用户信息存储在仓库中国
      let result = await reqUserInfo();
      if (result.code == 200) {
        this.username = result.data.username;
        this.avatar = result.data.avatar;
        return "ok";
      } else {
        return Promise.reject("获取用户信息失败");
      }
    },
    userLogout() {
      //mock接口：通知服务器本地用户唯一标识失效
      this.token = "";
      this.username = "";
      this.avatar = "";
      REMOVE_TOKEN();
    },
  },
  getters: {},
});
export default useUserStore;
