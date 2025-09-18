import request from "@/utils/request";
import type { SkuResponseData, SkuImgResponseData, SkuInfoData } from "./type";
enum API {
  //sku分页列表
  SKU_URL = "/admin/product/list/",
  //获取商品图片列表
  SKU_IMAGE_URL = "/admin/product/spuImageList/",
  //获取销售属性
  SKU_SALE_ATTR_URL = "/admin/product/skuSaleAttrList/",
  //商品上架
  SALE_URL = "/admin/product/onSale/",
  //商品下架
  CANCELSALE_URL = "/admin/product/cancelSale/",
  //获取商品信息
  SKU_INFO_URL = "/admin/product/findBySpuId/",
}

export const reqSkuList = (page: number, limit: number) => {
  return request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`);
};

export const reqSaleSku = (skuId: number) =>
  request.get<any, any>(API.SALE_URL + skuId);
export const reqCancelSale = (skuId: number) =>
  request.get<any, any>(API.CANCELSALE_URL + skuId);
export const reqSkuInfo = (skuId: number) =>
  request.get<any, SkuInfoData>(API.SKU_INFO_URL + skuId);
export const reqSkuImageList = (spuId: number) =>
  request.get<any, SkuImgResponseData>(API.SKU_IMAGE_URL + spuId);
