<template>
  <div class="tabbar_right">
    <el-button
      size="small"
      icon="Refresh"
      circle
      @click="updateRefresh"
    ></el-button>
    <el-button
      size="small"
      icon="FullScreen"
      circle
      @click="fullScreen"
    ></el-button>
    <el-button size="small" icon="Setting" circle></el-button>
    <img
      :src="userStore.avatar"
      alt=""
      style="width: 20px; height: 20px; margin: 0 10px"
    />
    <!-- 下拉菜单 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userStore.username
        }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="Logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import useLayoutSettingStore from "@/store/modules/setting";
import useUserStore from "@/store/modules/user";
import { useRouter, useRoute } from "vue-router";
let LayoutSettingStore = useLayoutSettingStore();
const updateRefresh = () => {
  LayoutSettingStore.refresh = !LayoutSettingStore.refresh;
};
const fullScreen = () => {
  let full = document.fullscreenElement; //dom对象一个属性，判断是否全屏
  if (!full) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};
const userStore = useUserStore();
let $router = useRouter(); //获取路由器对象
let $route = useRoute(); //获取当前路由对象
const Logout = async () => {
  //向服务器发出退出请求
  //仓库中数据清空
  //跳转到登录页面
  await userStore.userLogout();
  $router.push({ path: "/login", query: { redirect: $route.path } });
};
</script>
<script lang="ts">
export default {
  name: "Setting",
};
</script>
<style scoped>
.tabbar_right {
  display: flex;
  align-items: center;
}
</style>
