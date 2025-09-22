export interface ResponseData {
  code: number;
  message?: string; // 添加可选的 message 字段
  ok: boolean;
}
export interface RoleResponseData extends ResponseData {
  data: {
    current: number;
    pages: number;
    records: Role[];
    searchCount?: boolean;
    size: number;
    total: number;
  };
}
//定义角色的ts类型
export interface Role {
  ID?: number;
  createTime: string;
  id: number;
  roleName: string;
  remark?: string;
  updateTime: string;
  name: string;
  phone: string;
}

//更新新增角色
export interface RoleData {
  remark?: string;
  roleName: string;
  id?: number;
}
//菜单列表
export interface Menu {
  children: string[];
  level: number;
  pid: number;
  select: boolean;
  status: string;
  name: string;
}
export interface MenuResponseData extends ResponseData {
  data: Menu[];
}
