<template>
  <!-- 三级分类全局组件 -->
  <el-card>
    <el-form inline>
      <el-form-item label="一级分类">
        <el-select v-model="categoryStore.c1ID" clearable>
          <el-option
            v-for="c1 in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select placeholder="请选择二级分类" style="width: 200px" clearable>
          <el-option></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select placeholder="请选择三级分类" style="width: 200px" clearable>
          <el-option></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { reqC1, reqC2, reqC3 } from "@/components/view/product/attr";
import { onMounted, ref } from "vue";
import useCategoryStore from "@/store/modules/category";
let categoryStore = useCategoryStore();
onMounted(() => {
  categoryStore.getC1();
});

// 定义分类数据类型
interface CategoryItem {
  id: number;
  name: string;
}

// 响应式数据
</script>
<style scoped>
/* 确保表单项有足够的间距 */
.el-form--inline .el-form-item {
  margin-right: 20px;
  margin-bottom: 15px;
}

/* 设置标签的最小宽度 */
.el-form-item__label {
  min-width: 80px !important;
  text-align: right;
}

/* 确保选择框有合适的宽度 */
:deep(.el-select) {
  width: 200px;
}

/* 下拉面板的最小宽度 */
:deep(.el-select-dropdown) {
  min-width: 200px;
}

/* 选项的样式 */
:deep(.el-select-dropdown__item) {
  padding: 8px 20px;
  line-height: 1.5;
}

/* 卡片内边距 */
.el-card {
  margin: 10px;
}

:deep(.el-card__body) {
  padding: 20px;
}
</style>
