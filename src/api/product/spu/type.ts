export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

//SPU数据的类型
export interface SpuData {
  id?: number;
  spuName: string;
  description: string;
  category3Id: number | string;
  spuSaleAttrList: null | SaleAttr[];
  tmId: number | string;
  spuImageList: null | SpuImg[];
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
  baseSaleAttrId: number;
  saleAttrValueName: string;
  isChecked?: null | string;
}
export type spuSaleAttrValueList = SaleAttrValue[];
export interface SaleAttr {
  id?: number;
  createTime?: string;
  updateTime?: string;
  spuId?: number;
  baseSaleAttrId: number; //销售属性id
  saleAttrName: string; //销售属性名称
  spuSaleAttrValueList: spuSaleAttrValueList; //销售属性值对象
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
  data: HasSaleAttr;
}
