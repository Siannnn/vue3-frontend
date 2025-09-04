//统一管理用户相关的接口
import request from "../../utils/request";
import type { loginForm, loginResponseData, userResponseData } from "./type";

//统一管理接口
const API = {
  LOGIN_URL: "/user/login", // 修改为与 mock 数据匹配的 URL
  USER_INFO_URL: "/user/info", // 修改为与 mock 数据匹配的 URL
};
//暴露请求函数
//登录接口方法
export const reqLogin = (data: loginForm): Promise<loginResponseData> =>
  request.post(API.LOGIN_URL, data);
export const reqUserInfo = (): Promise<userResponseData> =>
  request.get(API.USER_INFO_URL);
