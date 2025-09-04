<template>
  <el-card style="max-width: 98%">
    <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
    <el-table style="margin: 10px 0px" border>
      <el-table-column
        label="序号"
        width="80px"
        align="center"
      ></el-table-column>
      <el-table-column label="品牌名称"></el-table-column>
      <el-table-column label="品牌logo"></el-table-column>
      <el-table-column label="品牌操作"></el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 7, 9]"
      :disabled="disabled"
      :background="true"
      layout=" prev, pager, next, jumper,->,sizes,total, "
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
let currentPage = ref<number>(1);
//每页展示多少数据
let limit = ref<number>(3);
let disabled = ref<boolean>(false);
</script>
<style scoped></style>
