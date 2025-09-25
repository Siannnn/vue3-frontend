<template>
  <div class="box">
    <div class="title">游客年龄比例</div>

    <div class="echarts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
let charts = ref();
onMounted(() => {
  let mycharts = echarts.init(charts.value);
  let option = {
    tooltip: {
      trigger: "item",
    },
    // title: {
    //   text: "游客年龄比例",
    //   left: "center",
    //   top: 5,
    //   textStyle: {
    //     color: "white",
    //     fontSize: 20,
    //   },
    // },
    legend: {
      right: 20,
      top: 40,
      orient: "vertical",
      textStyle: {
        color: "white",
        fontSize: 15,
      },
    },
    color: ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"],
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "inside",
          color: "white",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            name: "十岁以下",
            value: 800,
          },
          {
            name: "十岁到二十岁",
            value: 800,
          },
          {
            name: "二十岁到四十岁",
            value: 100,
          },
          {
            name: "四十岁以上",
            value: 50,
          },
        ],
      },
    ],
    //调整图表位置
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
  };
  mycharts.setOption(option);
});
</script>
<style scoped>
.box {
  background-size: 100% 100%;
  .title {
    color: white;
    font-size: 20px;
  }
  .echarts {
    width: 100%;
    height: 200px;
  }
}
</style>
