<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";

// onMounted(() => {
//   request({
//     url: "/user/login",
//     method: "post",
//     data: {
//       username: "admin",
//       password: "111111",
//     },
//   }).then((res) => {
//     console.log(res);
//   });
// });

// onMounted(() => {
//   reqLogin({ username: "admin1", password: "111111" }).then((res) => {
//     console.log(res);
//   });
// });
</script>
<style scoped></style>
