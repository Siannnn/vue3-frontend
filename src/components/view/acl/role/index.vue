<template>
  <el-card>
    <el-input
      placeholder="角色名称"
      style="width: 800px; margin-bottom: 10px; margin-right: 10px"
      clearable
    />
    <el-button type="primary" size="small">搜索</el-button>
    <el-button type="info" size="small">重置</el-button>
  </el-card>
  <el-card>
    <el-button type="primary" size="small" icon="Add">添加角色</el-button>

    <el-table border style="margin: 10px 0">
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="id" width="80px"></el-table-column>
      <el-table-column label="角色名称"></el-table-column>
      <el-table-column label="创建时间"></el-table-column>
      <el-table-column label="更新时间"></el-table-column>
      <el-table-column label="操作">
        <template #="{ row, $index }">
          <el-button type="text" size="small" icon="View">分配权限</el-button>
          <el-button type="text" size="small" icon="Edit">编辑</el-button>
          <el-button type="text" size="small" icon="Delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="limit"
      :page-sizes="[1, 3, 5, 7, 9]"
      :disabled="false"
      layout=" prev, pager, next, jumper,->,sizes,total, "
      :total="total"
      @size-change="handler"
      @current-change="getHasUser"
    />
  </el-card>
</template>

<script setup lang="ts"></script>
<style scoped></style>
