import request from "@/utils/request";
import type { Menu } from "./type";
//@ts-ignore
enum API {
  //添加新菜单
  ADDNEMENU_URL = "/admin/acl/permission/save",
  //更新菜单
  UPDATEMENU_URL = "/admin/acl/permission/update",
  //删除菜单
  DELETEMENU_URL = "/admin/acl/permission/remove/",
}

export const reqAddOrUpdateNewMenu = (data: Menu) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEMENU_URL, data);
  } else {
    return request.post<any, any>(API.ADDNEMENU_URL, data);
  }
};
export const reqDeleteMenu = (id: number) =>
  request.delete<any, any>(API.DELETEMENU_URL + id);
