//书写品牌管理模块接口
import request from "@/utils/request";
import type { TradeMarkResponseData, TradeMark } from "./type";
//接口地址
//@ts-ignore
enum API {
  TRADEMARK_URL = "/admin/product/baseTrademark/",
  ADDTRADEMARK_URL = "/admin/product/baseTrademark/save",
  UPDATETRADEMARK_URL = "/admin/product/baseTrademark/update",
  //删除已有品牌
  DELETE_URL = "/admin/product/baseTrademark/remove/",
}
//获取已有品牌的接口方法 第几页，几个
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`
  );
//添加品牌的接口方法
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  if (data.id) {
    //修改品牌
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data);
  } else {
    //添加品牌
    return request.post<any, any>(API.ADDTRADEMARK_URL, data);
  }
};

//删除已有品牌
export const reqDeleteTrademark = (id: number) =>
  request.delete<any, any>(API.DELETE_URL + id);
