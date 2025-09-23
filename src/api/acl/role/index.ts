import request from "@/utils/request";
import type { RoleResponseData, RoleData, MenuResponseData } from "./type";
enum API {
  //获取角色分页信息
  GETROLELIST_URL = "/admin/acl/role/",
  //新增角色 更新角色
  ADDROLE_URL = "/admin/acl/role/save/",
  UPDATEROLE_URL = "/admin/acl/role/update/",
  //删除角色
  DELETEROLE_URL = "/admin/acl/role/remove/",
  //获取菜单列表
  MENULIST_URL = "/admin/acl/permission",
  //给角色分配权限
  ASSIGNMENT_URL = "/admin/acl/role/permission/doAssign/?",
  //根据角色分配菜单
  GETROLEMENU_URL = "/admin/acl/role/permission/toAssign/",
}

export const reqGetRoleList = (
  page: number,
  limit: number,
  roleName?: string
) =>
  request.get<any, RoleResponseData>(
    API.GETROLELIST_URL + `${page}/${limit}?roleName=${roleName}`
  );
export const reqAddOrUpdateRole = (data: RoleData) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEROLE_URL, data);
  } else {
    return request.post<any, any>(API.ADDROLE_URL, data);
  }
};
export const reqDeleteRole = (id: number) =>
  request.delete<any, any>(API.DELETEROLE_URL + id);
export const reqGetMenuList = () =>
  request.get<any, MenuResponseData>(API.MENULIST_URL);
export const reqAllMenuList = (roleId: number) =>
  request.get<any, MenuResponseData>(API.GETROLEMENU_URL + roleId);
export const reqSetPermisstion = (roleId: number, permissionId: number[]) =>
  request.post<any, any>(
    API.ASSIGNMENT_URL + `roleId=${roleId}&permissionId=${permissionId}`
  );
