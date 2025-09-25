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
        <div class="center">
          <Map />
          <trend />
        </div>
        <div class="right">
          <Rating class="rating" />
          <Comparision class="comparision" />
          <Reserve class="reverse" />
        </div>
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
import Map from "./components/map/index.vue";
import Trend from "./components/trend/index.vue";
import Rating from "./components/rating/index.vue";
import Comparision from "./components/comparision/index.vue";
import Reserve from "./components/reserve/index.vue";
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
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/bg.jpg");
  background-size: cover;

  .screen {
    width: 1920px;
    height: 1080px;
    // background-color: azure;
    position: fixed;
    left: 50%;
    top: 50%;
    transform-origin: left top;
  }

  .top {
    width: 100%;
    height: 70px;
    background: url("@/assets/images/header.png");
  }
  .bottom {
    display: flex;
    .right {
      flex: 1;
      height: 1040px;
      display: flex;
      flex-direction: column;

      .rating {
        flex: 1.3;
      }
      .comparision {
        flex: 1;
      }
      .reverse {
        flex: 1;
      }
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
      }
      .age {
        flex: 1;
      }
    }
    .center {
      flex: 2;
    }
  }
}
</style>
