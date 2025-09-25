//创建用户相关小仓库
import { defineStore } from "pinia";
import { reqLogin, reqUserInfo, reqLogout } from "../../api/user";
// import type { loginForm, loginResponseData } from "../../api/user/type";
//引入常量路由
import { constantRoute, asyncRoute, anyRoute } from "../../router/routes";
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
import type {
  loginForm,
  loginResponseData,
  userInfoResponseData,
} from "@/api/user/type";
import router from "@/router";
//这是js文件，需要忽略ts校验  引入深拷贝方法
//@ts-ignore
import cloneDeep from "lodash/cloneDeep";
//用于过滤异步路由
function filterAsyncRoute(asyncRoute: any, routes: any) {
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.chldren && item.children.length > 0) {
        //递归过滤二级路由
        item.children = filterAsyncRoute(item.children, routes);
      }
      return true;
    }
  });
}
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
      console.log("登录结果：", result);
      if (result.code === 200) {
        this.token = result.data;
        SET_TOKEN(result.data);
        console.log("登录成功，token:", result.data);

        return "ok"; // 登录成功
      } else {
        console.log(
          "登录失败，code:",
          result.code,
          "错误信息:",
          result.message
        );
        throw new Error(result.message || "登录失败"); // 登录失败抛出错误
      }
    },
    async userInfo() {
      //获取用户信息存储在仓库中国
      let result: userInfoResponseData = await reqUserInfo();
      console.log("用户信息：", result);
      if (result.code == 200) {
        this.username = result.data.name;
        this.avatar = result.data.avatar;
        let userasyncRoute = filterAsyncRoute(
          cloneDeep(asyncRoute),
          result.data.routes
        );
        this.menuRoutes = [...constantRoute, ...userasyncRoute, anyRoute]; //菜单数据
        //但此时注册的只有常量路由，所以点击不同路由跳转到的都是空白模版
        //用户计算完毕异步路由、任意路由动态追加
        [...userasyncRoute, anyRoute].forEach((item) => {
          //动态注册路由
          //路由名称name和路由组件component必须一致
          router.addRoute(item); //异步路由是动态追加的，万一访问没加载出来就出问题
        });
        //  // this.token = result.data;  会把token包装成object object对象
        // SET_TOKEN(result.data);
        return "ok";
      } else {
        return Promise.reject("获取用户信息失败");
      }
    },
    async userLogout() {
      let result = await reqLogout();
      console.log("退出登录：", result);
      if (result.code == 200) {
        //mock接口：通知服务器本地用户唯一标识失效
        this.token = "";
        this.username = "";
        this.avatar = "";

        REMOVE_TOKEN();
        return "ok";
      } else {
        return Promise.reject(new Error(result.message || "退出登录失败"));
      }
    },
  },
  getters: {},
});
export default useUserStore;
