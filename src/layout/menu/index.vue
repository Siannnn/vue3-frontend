<template>
  <template v-for="item in menuList" :key="item.path">
    <el-menu-item
      v-if="!item.children && !item.meta?.hidden"
      :index="item.path"
      @click="goRoute"
      default-active="$router.path"
    >
      <el-icon>
        <component :is="item.meta.icon" v-if="item.meta?.icon" />
      </el-icon>
      <span>{{ item.meta?.title }}</span>
    </el-menu-item>
    <el-menu-item
      v-if="item.children && item.children.length == 1 && !item.meta?.hidden"
      :index="item.children[0].path"
      @click="goRoute"
    >
      <el-icon>
        <component :is="item.children[0].meta.icon" v-if="item.meta?.icon" />
      </el-icon>
      <span>{{ item.children[0].meta?.title }}</span>
    </el-menu-item>
    <!-- 有多个子菜单的项目：始终使用 el-sub-menu -->
    <el-sub-menu
      :index="item.path"
      v-if="item.children && item.children.length > 1 && !item.meta?.hidden"
    >
      <template #title>
        <el-icon>
          <component :is="item.meta?.icon" v-if="item.meta?.icon" />
        </el-icon>
        <span>{{ item.meta?.title }}</span>
      </template>
      <Menu :menuList="item.children" />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

// 定义 props
defineProps<{
  menuList: any[];
  collapse?: boolean;
}>();

let $router = useRouter();

const goRoute = (vc: any) => {
  $router.push(vc.index);
};
</script>
<script lang="ts">
export default {
  name: "Menu",
};
</script>
<style scoped></style>
