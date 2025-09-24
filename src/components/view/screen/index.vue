<template>
  <div class="container">
    <div class="screen" ref="screen">
      <div class="top">
        <Top />
      </div>
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist"></Tourist>

          <Sex class="sex"></Sex>
          <Age class="age"></Age>
        </div>
        <div class="center"></div>
        <div class="right"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
//引入顶部子组件
import Top from "./components/top/index.vue";
import Tourist from "./components/tourist/index.vue";
import Age from "./components/age/index.vue";
import Sex from "./components/sex/index.vue";

//获取数据大屏展示内容的盒子的dom元素
let screen = ref();
onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
});
//计算缩放比例
function getScale(w = 1920, h = 1080) {
  let scaleX = window.innerWidth / w;
  let scaleY = window.innerHeight / h;
  return Math.min(scaleX, scaleY);
}
//监听窗口变化
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
};
</script>
<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background-color: aquamarine;
  background-size: cover;

  .screen {
    width: 1920px;
    height: 1080px;
    background-color: azure;
    position: fixed;
    left: 50%;
    top: 50%;
    transform-origin: left top;
  }

  .top {
    width: 100%;
    height: 40px;
  }
  .bottom {
    display: flex;
    .right {
      flex: 1;
    }
    .left {
      flex: 1;

      height: 1040px;
      display: flex;
      flex-direction: column;

      .tourist {
        flex: 1.3;
        background-color: rgb(220, 117, 66);
      }
      .sex {
        flex: 1;
        background-color: black;
      }
      .age {
        flex: 1;
        background-color: beige;
      }
    }
    .center {
      flex: 2;
    }
  }
}
</style>
