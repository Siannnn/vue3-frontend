<template>
  <div class="tabbar_left">
    <el-icon style="margin-right: 10px" @click="changeIcon">
      <component :is="LayoutSettingStore.fold ? 'Fold' : 'Expand'" />
    </el-icon>
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item
        v-for="(item, index) in $route.matched"
        :key="index"
        v-show="item.meta.title"
        :to="item.path"
      >
        <el-icon style="margin: 0 2px">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta?.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import useLayoutSettingStore from "@/store/modules/setting";
let LayoutSettingStore = useLayoutSettingStore();
function changeIcon() {
  LayoutSettingStore.fold = !LayoutSettingStore.fold;
}
</script>
<script lang="ts">
export default {
  name: "Breadcrumb",
};
</script>
<style scoped>
.tabbar_left {
  display: flex;
  align-items: center;
  margin-left: 15px;
}
</style>
