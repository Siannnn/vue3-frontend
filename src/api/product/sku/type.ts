export interface ResponseData {
  code: number;
  message?: string;
  ok: boolean;
}
//定义sku对象类型
export interface Attr {
  attrId: number | string; //平台属性
  valueId: number | string; //属性值id
  valueName?: string; //属性值名称
  attrName?: string;
}
export interface SkuData {
  category3Id?: number | string;
  spuID?: number | string; //spu
  tmId?: string; //品牌
  skuName?: string; //sku名称
  price?: string | number;
  weight?: number | string;
  skuDesc?: string;
  skuAttrValueList?: Attr[]; //平台属性
  skuSaleAttrValueList?: [
    {
      saleAttrId: number | string; //销售属性id
      saleAttrValueId: number | string; //销售属性值]; //销售属性
    },
  ];
  skuImageList?: [
    {
      imgName: string;
      imgUrl: string;
      isDefault: string;
      skuId: 0;
      spuImgId: 0;
    },
  ];
  skuDefaultImg?: string; //默认图片
  isSale?: number; //控制商品的上下架
  id?: number;
}
export interface SaleAttr {
  id?: number;
  createTime?: string;
  updateTime?: string;
  spuId?: number;
  baseSaleAttrId: number | string; //销售属性id
  saleAttrName: string; //销售属性名称
  spuSaleAttrValueList: [
    {
      id?: number;
      createTime?: string;
      updateTime?: string;
      spuId?: number;
      isChecked?: null | string;

      baseSaleAttrId: number | string; //销售属性id
      saleAttrValueName: string;
    },
  ]; //销售属性值对象
  flag?: boolean; //展示spuForm 属性值tag的input状态
  saleAttrValue?: string; //收集tag销售属性值
  saleIdAndValueId?: {};
}
//获取sku接口返回的数
export interface SkuResponseData extends ResponseData {
  data: {
    records: SkuData[];
    total: number;
    size: number;
    current: number;
    orders: [];
    pages: number;
    searchCount: boolean;
  };
}

export interface SkuItem {
  id: number;
  imgName: string;
  imgUrl: string;
  spuId: number;
}
export interface SkuImgResponseData extends ResponseData {
  data: [
    {
      id: number;
      createTime: string;
      imgName: string;
      imgUrl: string;
      spuId: number;
    },
  ];
}
//商品信息
export interface SkuInfoData extends ResponseData {
  data: SkuData;
}

//获取销售属性值
export interface SkuSaleValueData extends ResponseData {
  data: SaleAttr[];
}
