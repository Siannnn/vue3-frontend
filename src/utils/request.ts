//进行axios二次封装
import axios from "axios";
import { ElMessage } from "element-plus";
//引入用户相关的仓库
import useUserStore from "@/store/modules/user";

let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, //基础路径会写的/api
  timeout: 5000,
}); //创建实例
//处理添加请求与响应拦截器
request.interceptors.request.use((config) => {
  //config配置对象,header属性请求头，常给服务器端携带公共参数

  // 获取token（从localStorage中获取）
  // const token = localStorage.getItem("TOKEN");
  // let userStore = useUserStore(); //获取用户相关小仓库获取内部token,登录成功后携带给服务器
  // if (userStore.token) {
  //   config.headers.token = userStore.token;
  // }
  const token = localStorage.getItem("TOKEN");
  if (token) {
    config.headers.token = token;
  }
  // 如果token存在，则添加到请求头中
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // 或者使用自定义的token字段名（根据后端要求）
  // config.headers.token = token;

  return config;
});
//响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    //处理http网络错误
    let message = "";
    //http状态码
    let status = error.response.status;
    switch (status) {
      case 401:
        message = "TOKEN过期";
        break;
      case 403:
        message = "没有权限访问";
        break;
      case 404:
        message = "请求地址错误";
        break;
      case 500:
        message = "服务器内部错误";
        break;
      default:
        message = "网络连接失败";
        break;
    }
    ElMessage({
      type: "error",
      message,
    });
    return Promise.reject(error);
  }
);

export default request;
