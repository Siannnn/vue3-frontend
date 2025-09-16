import request from "@/utils/request";
import type {
  HasSpuResponseData,
  AllTradeMark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  SpuData,
} from "./type";
enum API {
  SPU_LIST_URL = "/admin/product/",
  //获取全部品牌数据
  ALLTRADEMARK_URL = "/admin/product/baseTrademark/getTrademarkList",
  //某spu下全部售卖商品图片
  IMAGE_URL = "/admin/product/spuImageList/",
  //某spu下已有销售属性
  SPUHASSALEATTR_URL = "/admin/product/spuSaleAttrList/",
  //获取整个项目的销售属性
  ALLSALEATTR_URL = "/admin/product/baseSaleAttrList",

  //添加spu属性
  ADDSPU_URL = "/admin/product/saveSpuInfo",
  //修改spu属性
  UPDATESPU_URL = "/admin/product/updateSpuInfo",
}

export const reqSPUList = (
  page: number,
  limit: number,
  category3Id: number | string
) =>
  request.get<any, HasSpuResponseData>(
    API.SPU_LIST_URL + `${page}/${limit}?category3Id=${category3Id}`
  );
//全部品牌数据
export const reqAllTradeMark = () =>
  request.get<any, AllTradeMark>(API.ALLTRADEMARK_URL);
//spu下某商品照片
export const reqSpuImageList = (spuId: number) =>
  request.get<any, SpuHasImg>(API.IMAGE_URL + spuId);
export const reqSpuHasSaleAttr = (spuId: number) =>
  request.get<any, SaleAttrResponseData>(API.SPUHASSALEATTR_URL + spuId);

export const reqAllSaleAttr = () =>
  request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR_URL);

//添加修改spu属性
export const reqAddOrUpdateSpu = (data: SpuData) => {
  if (data.id) {
    return request.post<any, any>(API.UPDATESPU_URL, data);
  } else {
    return request.post<any, any>(API.ADDSPU_URL, data);
  }
};
