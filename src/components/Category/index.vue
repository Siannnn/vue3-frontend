<template>
  <!-- 三级分类全局组件 -->
  <el-card>
    <el-form inline>
      <el-form-item label="一级分类">
        <el-select
          :disabled="scene == 1 ? true : false"
          v-model="categoryStore.c1ID"
          clearable
          @change="handler()"
        >
          <el-option
            v-for="c1 in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          :disabled="scene == 1 ? true : false"
          @change="handler1"
          v-model="categoryStore.c2ID"
          style="width: 200px"
          clearable
        >
          <el-option
            v-for="c2 in categoryStore.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          :disabled="scene == 1 ? true : false"
          v-model="categoryStore.c3ID"
          style="width: 200px"
          clearable
        >
          <el-option
            v-for="c3 in categoryStore.c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref, defineProps } from "vue";
import useCategoryStore from "@/store/modules/category";
let categoryStore = useCategoryStore();
onMounted(() => {
  categoryStore.getC1();
});
//一级分类菜单选中值时触发
const handler = () => {
  categoryStore.c2ID = "";
  categoryStore.c3ID = "";
  categoryStore.c3Arr = [];
  categoryStore.getC2();
};
const handler1 = () => {
  categoryStore.c3ID = "";
  categoryStore.c3Arr = [];
  categoryStore.getC3();
};
defineProps(["scene"]);
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
