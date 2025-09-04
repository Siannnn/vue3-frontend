//登录接口需要携带参数的ts类型
export interface loginForm {
  username: string;
  password: string;
}

export interface loginResponseData {
  code: number;
  message?: string; // 添加可选的 message 字段
  data: {
    token: string;
  };
}

//服务器返回用户信息相关的数据类型
export interface userResponseData {
  code: number;
  data: {
    userId: number;
    avatar: string;
    username: string;
    password: string;
    desc: string;
    roles: string[];
    buttons: string[];
    routes: string[];
    token?: string;
  };
}
