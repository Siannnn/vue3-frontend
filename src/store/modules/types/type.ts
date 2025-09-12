import type { CategoryObj } from "@/components/view/product/attr/type";
export interface UserState {
  token: string | null;
  username: string;
  avatar: string;
}
//定分类仓库state对象的ts类型
export interface CategoryState {
  c1ID: string | number;
  c1Arr: CategoryObj[];
  c2ID: string | number;
  c2Arr: CategoryObj[];
  c3Arr: CategoryObj[];
  c3ID: string | number;
}
