//引入项目中全部的全局组件
import SvgIcon from "./SvgIcon/index.vue";

//全局对象
const allGlobalComponent = { SvgIcon };
// console.log(Object.keys(allGlobalComponent));

export default {
  //方法必须叫install
  install(app: any) {
    //注册项目全部的全局组件
    Object.keys(allGlobalComponent).forEach((key) => {
      app.component(
        key,
        allGlobalComponent[key as keyof typeof allGlobalComponent]
      );
    });
  },
};
