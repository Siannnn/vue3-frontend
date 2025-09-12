//属性相关的api请求
import request from "@/utils/request";
import type {
  CategoryResponseData,
  AttrResponseData,
  Attr,
} from "@/components/view/product/attr/type";
enum API {
  C1_URL = "/admin/product/getCategory1",
  C2_URL = "/admin/product/getCategory2/",
  C3_URL = "/admin/product/getCategory3/",
  //获取对应分类下的商品列表
  ATTR_URL = "/admin/product/attrInfoList/",
  //添加或修改属性
  ADDORUPDATEATTR_URL = "/admin/product/saveAttrInfo",
}
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL);
export const reqC2 = (c1Id: number | string) =>
  request.get<any, CategoryResponseData>(API.C2_URL + c1Id);
export const reqC3 = (c2Id: number | string) =>
  request.get<any, CategoryResponseData>(API.C3_URL + c2Id);
export const reqAttr = (c1ID: number, c2ID: number, c3ID: number) =>
  request.get<any, AttrResponseData>(API.ATTR_URL + `${c1ID}/${c2ID}/${c3ID}`);

//修改
export const reqAddOrUpdateAttr = (data: Attr) =>
  request.post<any, any>(API.ADDORUPDATEATTR_URL, data);
