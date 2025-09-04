<template>
  <div class="tabbar">
    <Breadcrumb />
    <Setting />
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from "./breadcrumb/index.vue";
import Setting from "./setting/index.vue";
</script>
<script lang="ts">
export default {
  name: "Tabbar",
};
</script>
<style scoped>
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(
    to right,
    rgb(245, 237, 237),
    rgb(217, 199, 199),
    rgb(203, 160, 160)
  );
}
</style>
