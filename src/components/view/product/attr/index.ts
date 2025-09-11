//属性相关的api请求
import request from "@/utils/request";

enum API {
  C1_URL = "/admin/product/getCategory1",
  C2_URL = "/admin/product/getCategory2/",
  C3_URL = "/admin/product/getCategory3/",
}
export const reqC1 = () => request.get<any, any>(API.C1_URL);
export const reqC2 = (c1Id: number | string) =>
  request.get<any, any>(API.C2_URL + c1Id);
export const reqC3 = (c2Id: number | string) =>
  request.get<any, any>(API.C3_URL + c2Id);
