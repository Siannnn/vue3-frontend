// src/store/modules/theme.ts
import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    color: "",
    dark: false,
  }),
  actions: {
    setColor(newColor: string) {
      this.color = newColor;
      const html = document.documentElement;
      html.style.setProperty("--el-color-primary", newColor);
    },
    setDark(isDark: boolean) {
      this.dark = isDark;
      const html = document.documentElement;
      html.className = isDark ? "dark" : "";
    },
    initTheme() {
      // 应用保存的设置
      const html = document.documentElement;
      html.style.setProperty("--el-color-primary", this.color);
      html.className = this.dark ? "dark" : "";
    },
  },
  persist: true, // 启用持久化
});
