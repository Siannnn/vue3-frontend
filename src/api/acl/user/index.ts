import request from "@/utils/request";
import type {
  UserResponseData,
  User,
  AssignRoleResponseData,
  SetRoleData,
} from "./type";
//@ts-ignore
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
  //删除用户
  DELETEUSER_URL = "/admin/acl/user/remove",
  //批量删除
  BATCHDELETEUSER_URL = "/admin/acl/user/batchRemove",
}

export const reqGetUserList = (page: number, limit: number, username: string) =>
  request.get<any, UserResponseData>(
    API.GETUSERLIST_URL + `${page}/${limit}?username=${username}`
  );
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
//删除用户
export const reqDeleteUser = (id: number) =>
  request.delete<any, any>(API.DELETEUSER_URL + `/${id}`);
//批量删除
export const reqBatchDeleteUser = (idList: number[]) =>
  request.delete<any, any>(API.BATCHDELETEUSER_URL, { data: idList });
