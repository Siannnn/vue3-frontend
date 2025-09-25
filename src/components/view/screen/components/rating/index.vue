<template>
  <div class="box">
    <div class="title">热门景区排行</div>
    <div class="echarts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
const charts = ref();

const datas = [
  {
    value: 60,
    name: "桃源河",
  },
  {
    value: 52,
    name: "梅江",
  },
  {
    value: 48,
    name: "柳园",
  },
  {
    value: 36,
    name: "芳草地",
  },
  {
    value: 30,
    name: "大草原",
  },
];
let maxArr = new Array(datas.length).fill(datas[0].value * 1.5);
const option = {
  //   backgroundColor: "black",
  tooltip: {
    show: true,
  },
  legend: {
    show: false,
  },
  grid: {
    left: "5%",
    right: "10%",
    bottom: "10%",
    top: "10%",
    containLabel: true,
  },
  xAxis: {
    show: false,
    type: "value",
  },
  yAxis: [
    {
      type: "category",
      inverse: true,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisPointer: {
        label: {
          show: true,
          margin: 30,
        },
      },
      data: datas.map((item) => item.name),
      axisLabel: {
        show: true,
        margin: 0,
        fontSize: 22,
        align: "top",
        verticalAlign: "bottom",
        color: "#fff",
        rich: {
          a: {
            padding: [0, -10, 12, 12],
            width: 24,
            fontSize: 22,
            height: 24,
            align: "center",
            color: "rgba(255, 255, 255, 0.7)",
          },
        },
        formatter: function (params) {
          var index = datas.map((item) => item.name).indexOf(params);
          index = index + 1;
          debugger;
          return ["{a|" + params + "}"].join("\n");
        },
      },
    },
    {
      type: "category",
      inverse: true,
      axisTick: "none",
      axisLine: "none",
      axisLabel: {
        show: true,
        fontSize: 14,
        color: "#aae9ff",
        inside: true,
        padding: [-20, 70, 20, 20],
        formatter: function (value, index) {
          return "{a|" + datas[index].value + "  }" + "{b|座}";
        },
        rich: {
          a: {
            fontSize: 32,
            color: "#15DB78",
            padding: [10, -10, 22, 12],
          },
          b: {
            fontSize: 24,
            color: "rgba(255, 255, 255, 0.7)",
            padding: [10, -10, 22, 0],
          },
        },
      },
      data: datas.map((item) => item.value),
    },
  ],
  series: [
    {
      z: 2,
      name: "数量",
      type: "bar",
      barWidth: 20,
      zlevel: 1,
      data: datas.map((item, index) => {
        return {
          value: item.value,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              {
                offset: 0,
                color: "rgba(93, 249, 36, 1)",
              },
              {
                offset: 1,
                color: "rgba(93, 249, 36, 0)",
              },
            ]),
          },
        };
      }),
    },
    {
      name: "", // 上部圆
      type: "pictorialBar",
      silent: true,
      symbolSize: [20, 20],
      symbolOffset: [10, 0],
      symbolPosition: "end",
      zlevel: 3,
      itemStyle: {
        color: "#5DF924",
      },
      tooltip: {
        show: false,
      },
      data: datas.map((item) => item.value),
    },
    {
      name: "背景",
      type: "bar",
      barWidth: 20,
      bar: 20,
      barGap: "-100%",
      itemStyle: {
        color: "rgba(61, 61, 61, 0.32)",
      },
      tooltip: {
        show: false,
      },
      data: maxArr,
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
    font-size: 30px;
  }
  .echarts {
    width: 100%;
    height: 400px;
  }
}
</style>
