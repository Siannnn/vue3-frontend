//小仓库 关于layout组件的操作
import { defineStore } from "pinia";
let useLayoutSettingStore = defineStore("layoutSetting", {
  state: () => {
    return {
      //是否折叠侧边栏
      fold: false,
      refresh: false, //控制刷新
    };
  },
  actions: {
    //修改侧边栏折叠状态
    changeCollapse() {
      this.fold = !this.fold;
    },
  },
});
export default useLayoutSettingStore;
