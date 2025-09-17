export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

//SPU数据的类型
export interface SpuData {
  id?: number;
  spuName?: string;
  description: string;
  category3Id?: number | string;
  spuSaleAttrList: SaleAttr[];
  tmId?: number | string;
  spuImageList?: null | SpuImg[];
}
//数组：元素都是SPU类型
export type Records = SpuData[];
//已有spu接口返回的
export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
  };
}
//spu品牌更新
export interface TradeMark {
  id: number;
  tmName: string;
  logoUrl: string;
}
export interface AllTradeMark extends ResponseData {
  data: TradeMark[];
}

//spu下某商品图片 类型
export interface SpuImg {
  id?: number;
  createTime?: string;
  updateTime?: string;
  spuId?: number;
  imgName?: string;
  imgUrl?: string;
  name?: string;
  url?: string;
}
//已有spu照片1墙数据的类型
export interface SpuHasImg extends ResponseData {
  data: SpuImg[];
}
//已有销售属性类型
export interface SaleAttrValue {
  id?: number;
  createTime?: string;
  updateTime?: string;
  spuId?: number;
  isChecked?: null | string;

  baseSaleAttrId: number | string; //销售属性id
  saleAttrValueName: string;
}
export type spuSaleAttrValueList = SaleAttrValue[];
export interface SaleAttr {
  id?: number;
  createTime?: string;
  updateTime?: string;
  spuId?: number;
  baseSaleAttrId: number | string; //销售属性id
  saleAttrName: string; //销售属性名称
  spuSaleAttrValueList: spuSaleAttrValueList; //销售属性值对象
  flag?: boolean; //展示spuForm 属性值tag的input状态
  saleAttrValue?: string; //收集tag销售属性值
  saleIdAndValueId?: {};
}
//spu已有的销售属性接口返回的数据类型
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[];
}
//整个项目的销售属性
export interface HasSaleAttr {
  id: number;
  name: string;
}
export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[];
}

export interface Attr {
  attrId: number | string; //平台属性
  valueId: number | string; //属性值id
}
export interface SaleAttrId {
  saleAttrId: number | string; //销售属性id
  saleAttrValueId: number | string; //销售属性值
}
export interface SkuImage {
  imgName: string;
  imgUrl: string;
  isDefault: string;
  skuId: 0;
  spuImgId: 0;
}

//sku数据类型
export interface SkuData {
  category3Id: number | string;
  spuId: number | string; //spu
  tmId: string; //品牌
  skuName: string; //sku名称
  price: string | number;
  weight: number | string;
  skuDesc: string;
  skuAttrValueList?: Attr[]; //平台属性
  skuSaleAttrValueList?: SaleAttrId[]; //销售属性
  skuImageList?: SkuImage[];
  skuDefaultImg: string; //默认图片
}
export interface SkuResponseData extends ResponseData {
  data: SkuData[];
}
//获取sku数据接口
export interface SkuInfoData extends ResponseData {
  data: SkuData[];
}
