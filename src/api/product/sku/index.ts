import request from "@/utils/request";
enum API {
  //sku分页列表
  SKU_URL = "/admin/product/list/",
  //获取商品图片列表
  SKU_IMAGE_URL = "/admin/product/skuImageList/",
  //获取销售属性
  SKU_SALE_ATTR_URL = "/admin/product/skuSaleAttrList/",
}

export const reqSkuList = (page: number, limit: number) => {
  return request.get<any, any>(API.SKU_URL + `${page}/${limit}`);
};
