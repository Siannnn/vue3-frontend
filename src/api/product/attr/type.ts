export interface ResponseData {
  code: number;
  message: string;

  ok: boolean;
}
export interface CategoryObj {
  id: number;
  name: string;
  ID: number;
}

export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[];
}
//属性值的ts类型
export interface AttrValue {
  id?: number;
  valueName: string;
  attrId?: number;
  flag?: boolean;
}
export type AttrValueList = AttrValue[];
export interface Attr {
  id?: number;
  attrName: string;
  categoryId: number | string;
  categoryLevel: number;
  attrValueList: AttrValueList;
}

export type AttrList = Attr[];
export interface AttrResponseData extends ResponseData {
  data: Attr[];
}
