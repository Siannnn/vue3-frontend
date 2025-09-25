<template>
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="goHome">首页</span>
    </div>
    <div class="center">
      <div class="title">路桥卫士可视化数据管理平台</div>
    </div>
    <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="time">当前时间:{{ time }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
//回到首页
import { useRouter } from "vue-router";
import moment from "moment";
import { ref, onMounted, onBeforeUnmount } from "vue";
let $router = useRouter();
function goHome() {
  $router.push("/home");
}
//存储当前时间
let time = ref(moment().format("YYYY-MM-DD HH:mm:ss"));
let timer = ref(0);
//组件挂载完毕要时时更新时间
onMounted(() => {
  setInterval(() => {
    time.value = moment().format("YYYY-MM-DD HH:mm:ss");
  }, 1000);
});
onBeforeUnmount(() => {
  clearInterval(timer.value);
});
</script>
<style scoped lang="scss">
.top {
  width: 100%;
  height: 40px;
  display: flex;
  .left {
    flex: 1;
    // background-color: rgb(217, 159, 159);
    background-size: cover;
    .lbtn {
      width: 150px;
      height: 40px;
      float: right;
      background-size: cover;
      // background-color: aliceblue;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
      font-size: 20px;
      margin-top: 20px;
    }
  }
  .center {
    flex: 2;
    .title {
      width: 100%;
      height: 74px;
      // background-color: royalblue;
      background-size: 100% 100%;
      text-align: center;
      line-height: 74px;
      font-size: 40px;
      color: #29fcff;
      margin-top: -5px;
    }
  }
  .right {
    flex: 1;
    // background-color: rgb(217, 159, 159);
    background-size: cover;
    display: flex;
    justify-content: space-between;
    .rbtn {
      width: 150px;
      height: 40px;
      // background-color: aliceblue;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
      font-size: 20px;
      margin-top: 20px;
    }
    .time {
      color: #29fcff;
      margin-right: 20px;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
      margin-top: 20px;
    }
  }
}
</style>
