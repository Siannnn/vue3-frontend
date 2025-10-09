<template>
  <div class="layout-container">
    <div
      class="layout-slider"
      :class="{ fold: LayoutSettingStore.fold ? true : false }"
    >
      <logo />
      <el-scrollbar class="scrollbar">
        <el-menu
          :collapse="LayoutSettingStore.fold ? true : false"
          background-color="$base-menu-background"
          text-color="#ccc"
          class="slider-menu"
        >
          <Menu :menuList="userStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </div>
    <div
      class="layout-tabbar"
      :class="{ fold: LayoutSettingStore.fold ? true : false }"
    >
      <Tabbar />
    </div>
    <div
      class="layout-main"
      :class="{ fold: LayoutSettingStore.fold ? true : false }"
    >
      <Main />
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from "./logo/index.vue";
import Menu from "./menu/index.vue";
import Main from "./main/index.vue";
//获取用户小仓库
import useUserStore from "@/store/modules/user";
import Tabbar from "./tabbar/index.vue";
import useLayoutSettingStore from "@/store/modules/setting";
let LayoutSettingStore = useLayoutSettingStore();
let userStore = useUserStore();
</script>
<script lang="ts">
export default {
  name: "Layout",
};
</script>
<style scoped lang="scss">
.layout-container {
  width: 100%;
  height: 100vh;

  margin: 0px;
  .layout-slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    color: white;
    transition: all 0.3s;
    &.fold {
      width: $base-menu-min-width;
    }
    .slider-menu {
      background: $base-menu-background;
      height: 100%;
      overflow-y: auto;
    }
  }
  .layout-tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width); // 修复：添加空格
    height: $base-tabbar-height;

    top: 0px;
    left: $base-menu-width;
    transition: all 0.3s;
    &.fold {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
  .layout-main {
    position: absolute; //绝对定位
    width: calc(100% - $base-menu-width); // 修复：添加空格
    height: calc(100vh - $base-tabbar-height); // 修复：添加空格

    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
    &.fold {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
