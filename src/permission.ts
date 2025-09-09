//路由鉴权：什么条件下可以访问
import router from "./router";
import nprogress from "nprogress"; //引入进度条插件
import "nprogress/nprogress.css"; //引入进度条样式
nprogress.configure({ showSpinner: false }); //配置进度条
import setting from "./setting"; //引入项目配置
//获取用户小仓库token数据判断是否登陆成功
import useUserStore from "./store/modules/user";
import pinia from "./store";
let userStore = useUserStore(pinia);

//全局守卫：项目中任意路由切换都会触发的钩子

//全局前置守卫 访问某一路由前会执行的函数
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = (setting.title + "-" + to.meta.title) as string; //动态修改网页标题
  nprogress.start(); //进度条开始
  let token = userStore.token || localStorage.getItem("TOKEN");
  let username = userStore.username;

  if (token) {
    if (to.path == "/login") {
      next({ path: "/" }); //如果已经登录还想访问登录页，跳转到首页
    } else {
      if (username) {
        next(); //放行
      } else {
        //无信息则发请求获取信息再放行
        try {
          await userStore.userInfo();
          next();
        } catch (error) {
          //token过期
          await userStore.userLogout(); //清除token
          next({ path: "/login", query: { redirect: to.path } }); //跳转登录页
        }
      }
    }
  } else {
    if (to.path == "/login") {
      next();
    } else {
      next({ path: "/login", query: { redirect: to.path } }); //将未登录时想访问的路由传递给登录页
    }
  }
});

//全局后置守卫
router.afterEach((to: any, from: any) => {
  nprogress.done(); //进度条结束
});

//未登录不可访问其他路由
//登陆成功不可以访问login
