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
    <el-popover
      class="box-item"
      title="主题设置"
      content="Top Left prompts info"
      placement="bottom"
      trigger="hover"
      :width="300"
    >
      <el-form>
        <el-form-item label="主题色">
          <el-color-picker
            v-model="color"
            show-alpha
            :predefine="predefineColors"
            size="small"
            :teleported="false"
            @change="changeColor"
          />
        </el-form-item>
        <el-form-item label="暗黑模式">
          <el-switch
            v-model="dark"
            size="small"
            active-icon="MoonNight"
            inactive-icon="Sunny"
            inline-prompt
            @change="changeDark"
          />
        </el-form-item>
      </el-form>
      <template #reference>
        <el-button size="small" icon="Setting" circle></el-button>
      </template>
    </el-popover>

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
import { ref, onMounted, computed } from "vue";
import { useThemeStore } from "@/store/modules/theme";
let themeStore = useThemeStore();
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
  try {
    await userStore.userLogout();

    $router.push({ path: "/login" });
    window.location.reload(); //退出登录后，重新刷新页面，防止退出登录后还能访问其他页面
  } catch (err) {
    $router.push({ path: "/login" });
  }
};

//颜色组件
// const color = ref("rgba(255, 69, 0, 0.68)");
const predefineColors = ref([
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "rgba(255, 69, 0, 0.68)",
  "rgb(255, 120, 0)",
  "hsv(51, 100, 98)",
  "hsva(120, 40, 94, 0.5)",
  "hsl(181, 100%, 37%)",
  "hsla(209, 100%, 56%, 0.73)",
  "#c7158577",
]);
//主题颜色设置
const changeColor = () => {
  //通过js修改根节点的样式对象属性值
  // const html = document.documentElement;
  // html.style.setProperty("--el-color-primary", color.value);
  themeStore.setColor(color.value);
};

const changeDark = () => {
  //获取html根节点
  // let html = document.documentElement;
  // console.log(html);
  // //判断html是否有类名dark
  // dark.value ? (html.className = "dark") : (html.className = "");
  themeStore.setDark(dark.value);
};
// 使用计算属性双向绑定
const color = computed({
  get: () => themeStore.color,
  set: (value) => themeStore.setColor(value),
});
const dark = computed({
  get: () => themeStore.dark,
  set: (value) => themeStore.setDark(value),
});
onMounted(() => {
  themeStore.initTheme();
});
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
