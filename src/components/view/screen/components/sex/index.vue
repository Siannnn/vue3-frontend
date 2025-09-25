<template>
  <div class="box1">
    <div class="title">
      <p>男女比例</p>
      <img src=""></img>
    </div>
    <div class="sex">
      <div class="man">
        男生
        <img src=""></img>
      </div>
      <div class="woman">
        女生
        <img src=""></img>
      </div>
    </div>
    <div class="rate">
        <p>男20%</p>
        <p>女80%</p>
      </div>
      <div class="charts" ref="charts">

      </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
let charts = ref();
onMounted(() => {
  let mycharts = echarts.init(charts.value);
  mycharts.setOption({
    title: {
      text: '男女比例', textStyle: { color: 'skyblue' }, left: '40%'
    },
    xAxis: { min:0, max:100,show: false},
    yAxis: {show: false,type:'category'},
    series: [{
      type: 'bar',
      data: [20],
      barWidth: 20,
      z: 100,
      itemStyle: {
        color: 'blue',
        borderRadius:20
      }
    },{
      type: 'bar',
      data: [100],
      barWidth: 20,
      barGap: '-100%', // 重叠显示 位置
      itemStyle: {
        color: 'pink',
        borderRadius:20
      }
    }],
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom:0
    }
  })
})
</script>
<style scoped>
.box1 {
  width: 100%;
  height: 100%;
  background-color: red;
  background-size:100% 100%;
margin:20px 0;
.title{
  margin-left:20px;
  p{
    font-size:20px;
    color:white;
  }

}
.sex{
  display:flex;
  justify-content: center;
  .man{
    margin:20px
  }
  .woman{
    margin:20px
  }
  
}
.rate{
    display:flex;
    justify-content: space-between;
    color:white;
  }
  .charts{
    height:100px;
    background-color: aqua;
  }
}
</style>
