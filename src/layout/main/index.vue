<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { watch, ref, nextTick } from "vue";
import useLayoutSettingStore from "@/store/modules/setting";
let LayoutSettingStore = useLayoutSettingStore();

//控制组件是否销毁重建
let flag = ref(true);
watch(
  () => LayoutSettingStore.refresh,
  () => {
    flag.value = false;
    nextTick(() => {
      flag.value = true;
    });
  }
);

// Main 组件：负责显示当前路由匹配的组件
</script>
<script lang="ts">
export default {
  name: "Main",
};
</script>
<style scoped>
.fade-enter-from {
  opacity: 0;
  /* transform: rotate(0deg); */
}
.fade-enteractive {
  /* transition: all 0.3s; */
}
.fade-enter-to {
  opacity: 1;
  /* transform: rotate(360deg); */
}
</style>
