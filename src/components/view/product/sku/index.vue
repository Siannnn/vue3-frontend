<template>
  <el-card>
    <el-table border style="margin: 10px 0">
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="80px"
      ></el-table-column>
      <el-table-column
        label="名称"
        show-overflow-tooltip
        width="150px"
      ></el-table-column>
      <el-table-column
        label="描述"
        show-overflow-tooltip
        width="150px"
      ></el-table-column>
      <el-table-column label="默认图片"></el-table-column>
      <el-table-column label="重量(g)"></el-table-column>
      <el-table-column label="价格(元)"></el-table-column>
      <el-table-column label="操作" fixed="right" width="220px">
        <template #default="scope">
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
          <el-button type="text" size="small">删除</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 7, 9]"
      :disabled="false"
      layout=" prev, pager, next, jumper,->,sizes,total, "
      :total="total"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
//分页器
let currentPage = ref<number>(1);
let limit = ref<number>(3);
let total = ref<number>(0);
</script>
<style scoped></style>
