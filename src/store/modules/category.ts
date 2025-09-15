//商品分类全局组件
import { defineStore } from "pinia";
import { reqC1, reqC2, reqC3 } from "@/api/product/attr";
import type { CategoryResponseData } from "@/api/product/attr/type";
import type { CategoryState } from "@/store/modules/types/type";
let useCategoryStore = defineStore("category", {
  state: (): CategoryState => {
    return {
      c1Arr: [],
      //存储一级分类id
      c1ID: "",
      c2Arr: [],
      c2ID: "",
      c3Arr: [],
      c3ID: "",
    };
  },
  actions: {
    async getC1() {
      let result: CategoryResponseData = await reqC1();
      if (result.code === 200) {
        this.c1Arr = result.data;
      }
    },
    async getC2() {
      let result: CategoryResponseData = await reqC2(this.c1ID);
      if (result.code === 200) {
        this.c2Arr = result.data;
      }
    },
    async getC3() {
      let result: CategoryResponseData = await reqC3(this.c2ID);
      if (result.code === 200) {
        this.c3Arr = result.data;
      }
    },
    getters: {},
  },
});
export default useCategoryStore;
