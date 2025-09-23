export interface ResponseData {
  code: number;
  message?: string; // 添加可选的 message 字段
  ok: boolean;
}
export interface Menu {
  code: string;
  level: number;
  name: string;
  id?: number;
  type?: number;
  pid: number;
}
export interface Permission {
  children: [];
  level: number;
  pid: number;
  select: boolean;
  status: string;
  name: string;
  id: number;
  code: string;
}
