import request from "@/utils/request";
import type {
  HasSpuResponseData,
  AllTradeMark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  SpuData,
  SkuResponseData,
  SkuInfoData,
} from "./type";
//@ts-ignore
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
  //添加sku
  ADDSKU_URL = "/admin/product/saveSkuInfo",
  //查看sku
  SKUINFO_URL = "/admin/product/findBySpuId/",
  //删除已有spu
  REMOVE_URL = "/admin/product/deleteSpu/",
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

export const reqAddSku = (data: any) =>
  request.post<any, SkuResponseData>(API.ADDSKU_URL, data);
//查看sku
export const reqSkuList = (spuId: number | string) =>
  request.get<any, SkuInfoData>(API.SKUINFO_URL + spuId);

export const reqRemoveSpu = (spuId: number) =>
  request.delete<any, any>(API.REMOVE_URL + spuId);
