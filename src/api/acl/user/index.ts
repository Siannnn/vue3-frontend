import request from "@/utils/request";
import type {
  UserResponseData,
  User,
  AssignRoleResponseData,
  SetRoleData,
} from "./type";
enum API {
  //获取角色分页信息
  GETUSERLIST_URL = "/admin/acl/user/",
  //新增用户接口
  ADDUSER_URL = "/admin/acl/user/save",
  //编辑更新
  UPDATEUSER_URL = "/admin/acl/user/update",
  //分配角色
  ASSIGNROLE_URL = "/admin/acl/user/toAssign",
  //为用户分配角色
  ASSIGNUSERROLE_URL = "/admin/acl/user/doAssignRole",
}

export const reqGetUserList = (page: number, limit: number) =>
  request.get<any, UserResponseData>(API.GETUSERLIST_URL + `${page}/${limit}`);
//新增用户
export const reqAddOdUpdateUser = (data: User) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL, data);
  } else {
    return request.post<any, any>(API.ADDUSER_URL, data);
  }
};
//分配角色
export const reqAssignRole = (adminId: number) =>
  request.get<any, AssignRoleResponseData>(API.ASSIGNROLE_URL + `/${adminId}`);
//为用户分配角色
export const reqAssignUserRole = (data: SetRoleData) =>
  request.post<any, any>(API.ASSIGNUSERROLE_URL, data);
