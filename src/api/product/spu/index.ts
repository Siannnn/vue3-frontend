import request from "@/utils/request";
import type {
  HasSpuResponseData,
  AllTradeMark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  SpuData,
  SkuData,
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

  //sku分页列表
  SKU_LIST_URL = "/admin/product/list/",
  //获取商品图片列表
  SKU_IMAGE_URL = "/admin/product/skuImageList/",
  //获取销售属性
  SKU_SALE_ATTR_URL = "/admin/product/skuSaleAttrList/",
  //根据spuId获取sku列表
  SKU_BY_SPU_URL = "/admin/product/findBySpuId/",
  //添加sku
  ADDSKU_URL = "/admin/product/saveSkuInfo",
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

//获取sku分页列表
export const reqSkuList = (page: number, limit: number) =>
  request.get<any, any>(API.SKU_LIST_URL + `${page}/${limit}`);
//获取sku图片列表
export const reqSkuImageList = (spuId: number) =>
  request.get<any, any>(API.SKU_IMAGE_URL + spuId);
//获取sku销售属性
export const reqSkuSaleAttrList = (spuId: number) =>
  request.get<any, any>(API.SKU_SALE_ATTR_URL + spuId);
//根据spuId获取sku列表
export const reqSkuBySpuId = (spuId: number) =>
  request.get<any, any>(API.SKU_BY_SPU_URL + spuId);

export const reqAddSku = (data: any) =>
  request.post<any, SkuData>(API.ADDSKU_URL, data);
