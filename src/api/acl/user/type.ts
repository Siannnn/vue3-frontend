export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}
//获取用户分页信息
export interface Records {
  ID: number;
  createTime: {};
  id: 0;
  name: string;
  updateTime: {};
  password: string;
  phone: string;
  roleName: string;
  username: string;
}
export interface UserData {
  current: number;
  pages: number;
  records: Records[];

  searhCount: boolean;
  size: number;
  total: number;
}
export interface UserResponseData extends ResponseData {
  data: UserData;
}
//编辑添加用户
export interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  roleName: string;
  phone: string;
}
//分配角色
export interface AllRole {
  ID: 0;
  createTime: {
    "time.Time": "string";
  };
  id: 0;
  remark: "string";
  roleName: "string";
  updateTime: {
    "time.Time": "string";
  };
}
export interface AssignRoleResponseData extends ResponseData {
  data: {
    ID: number;
    createTime: string;
    id: number;
    roleName: string;
    assignRoles: [
      {
        roleName: string;
        id: number;
        createTime: string;
        updateTime: string;
      },
    ];
    allRolesList: AllRole[];
  };
}

export interface SetRoleData {
  roleIdList: number[];
  userId: number;
}
