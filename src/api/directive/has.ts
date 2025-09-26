import pinia from "@/store"; //引入pinia是为了在非vue组件环境中使用store 避免上下文问题
import useUserStore from "@/store/modules/user";

export const isHasButton = (app: any) => {
  //全局自定义指令
  app.directive("has", {
    //代表使用这个全局自定义指令的Dom组件挂载完毕的时候会执行一次
    mounted(el: any, option: any) {
      //el是使用这个指令的dom组件，option配置
      let userStore = useUserStore(pinia);
      if (!userStore.buttons.includes(option.value)) {
        //如果当前用户没有这个按钮权限
        el.parentNode && el.parentNode.removeChild(el); //删除这个dom元素
      }
    },
  });
};
