//登录接口需要携带参数的ts类型
export interface loginForm {
  username: string;
  password: string;
}

//定义全部接口返回数据类型
export interface ResponseData {
  code: number;
  message?: string; // 添加可选的 message 字段
  ok: boolean;
}
export interface loginResponseData extends ResponseData {
  data: string;
}

//服务器返回用户信息相关的数据类型
export interface userInfoResponseData extends ResponseData {
  data: {
    avatar: string;
    buttons: string[];
    name: string;
    roles: string[];
    routes: string[];
  };
}
