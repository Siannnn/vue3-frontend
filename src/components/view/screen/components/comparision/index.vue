<template>
  <div class="box">
    <div class="title">年度游客量对比</div>

    <div class="echarts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
const charts = ref();
const stateData = {
  xAxisData: [2016, 2017, 2018, 2019, 2020],
  sgData: [10, 8, 30, 40, 5],
  bgData: [6, 70, 8, 90, 10],
  cgData: [20, 30, 60, 50, 30],
};
const option = {
  tooltip: {},
  legend: {
    itemWidth: 7,
    itemHeight: 7,
    // itemGap: 15,
    icon: "rect",
    // right: 0,
    textStyle: {
      fontSize: 14,
      fontFamily: "PingFangSC, PingFang SC",
      fontWeight: 400,
      color: "#FFFFFF",
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: stateData.xAxisData,
    axisLabel: {
      fontSize: 14,
      fontFamily: "PingFangSC, PingFang SC",
      fontWeight: 400,
      color: "#FFFFFF",
    },
  },
  yAxis: {
    type: "value",
    name: "单位/件",
    nameTextStyle: {
      fontSize: 14,
      fontFamily: "PingFangSC, PingFang SC",
      fontWeight: 400,
      color: "#FFFFFF",
    },
    axisLabel: {
      fontSize: 14,
      fontFamily: "PingFangSC, PingFang SC",
      fontWeight: 400,
      color: "#FFFFFF",
    },
  },
  series: [
    {
      name: "事故",
      data: stateData.sgData,
      type: "line",
      smooth: true,
      itemStyle: {
        normal: {
          color: "rgba(255, 116, 133, 1)",
          lineStyle: {
            color: "rgba(255, 116, 133, 1)",
            width: 2,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: "rgba(255, 116, 133, 0)",
              },
              {
                offset: 1,
                color: "rgba(255, 116, 133, 1)",
              },
            ]),
          },
        },
      },
    },
    {
      name: "报警",
      data: stateData.bgData,
      type: "line",
      smooth: true,
      itemStyle: {
        normal: {
          color: "rgba(95, 175, 255, 1)",
          lineStyle: {
            color: "rgba(95, 175, 255, 1)",
            width: 2,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: "rgba(95, 175, 255, 0)",
              },
              {
                offset: 1,
                color: "rgba(95, 175, 255, 1)",
              },
            ]),
          },
        },
      },
    },
    {
      name: "安全",
      data: stateData.cgData,
      type: "line",
      smooth: true,
      itemStyle: {
        normal: {
          color: "rgba(195, 175, 255, 1)",
          lineStyle: {
            color: "rgba(195, 175, 255, 1)",
            width: 2,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: "rgba(195, 105, 255, 0)",
              },
              {
                offset: 1,
                color: "rgba(195, 105, 255, 1)",
              },
            ]),
          },
        },
      },
    },
  ],
};
onMounted(() => {
  let mycharts = echarts.init(charts.value);
  mycharts.setOption(option);
});
</script>
<style scoped>
.box {
  background-size: 100% 100%;
  .title {
    color: white;
    font-size: 20px;
    margin-left: 20px;
  }
  .echarts {
    width: 100%;
    height: 100%;
  }
}
</style>
