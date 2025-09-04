<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="logo" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from "../../setting";
</script>
<script lang="ts">
export default {
  name: "Logo",
};
</script>
<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  display: flex;
  align-items: center;
  padding: 9px;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    font-size: $base-menu-logo-fontsize;
    color: white;
    margin-left: 10px;
  }
}
</style>
