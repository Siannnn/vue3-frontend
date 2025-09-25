<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">可预约总量<span>99999</span>人</p>
    </div>
    <div class="number">
      <span v-for="item in people">{{ item }}</span>
    </div>
    <!-- echarts展示图形图标 -->
    <div class="echarts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
let people = ref("216908");
import * as echarts from "echarts";

console.log(echarts);
let charts = ref();

onMounted(() => {
  //获取echarts实例
  let mycharts = echarts.init(charts.value);

  //设置实例的配置项
  mycharts.setOption({
    title: {},
    //系列决定你展示什么样的图形图标
    series: {
      type: "pie", //pie bar line
      data: [
        {
          value: 335,
          name: "早上流量",
        },
        {
          value: 234,
          name: "下午流量",
        },
        {
          value: 1548,
          name: "夜晚流量",
        },
      ],
      radius: "80%",
    },
    //布局组件
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  });
});
</script>
<style scoped lang="scss">
.box {
  //   background: url("https://img0.baidu.com/it/u=4287057922,4143038726&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889");
  background-size: 100% 100%;
  margin-top: 10px;
  .top {
    .title {
      color: white;
      font-size: 20px;
      margin-left: 20px;
    }
    .bg {
      width: 68px;
      height: 7px;
      //   background: url();
      background-size: 100% 100%;
      margin-top: 3px;
    }
    .right {
      float: right;
      color: white;
      font-size: 20px;
      span {
        color: yellowgreen;
      }
    }
  }
  .number {
    background-color: red;
    margin-top: 30px;
    display: flex;
    padding: 20px;
    span {
      flex: 1;
      height: 40px;
      text-align: center;
      line-height: 40px;
      //   background:url();
      background-size: 100% 100%;
      color: #29fcff;
    }
  }
  .echarts {
    width: 100%;
    height: 240px;
    background-color: rgb(238, 223, 223);
  }
}
</style>
