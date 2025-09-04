<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import request from "./utils/request";
import { onMounted } from "vue";
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
import { reqLogin } from "./api/user";
// onMounted(() => {
//   reqLogin({ username: "admin1", password: "111111" }).then((res) => {
//     console.log(res);
//   });
// });
</script>
<style scoped></style>
