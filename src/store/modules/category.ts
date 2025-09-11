//商品分类全局组件
import { defineStore } from "pinia";
import { reqC1, reqC2, reqC3 } from "@/components/view/product/attr";
let useCategoryStore = defineStore("category", {
  state: () => {
    return {
      c1Arr: [] as any[],
      //存储一级分类id
      c1ID: "",
    };
  },
  actions: {
    async getC1() {
      let result = await reqC1();
      if (result.code === 200) {
        this.c1Arr = result.data;
      }
    },
  },
  getters: {},
});
export default useCategoryStore;
