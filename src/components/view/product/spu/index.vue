<template>
  <category />
  <el-card style="margin: 10px 0px">
    <div v-show="scene == 0">
      <el-button
        type="primary"
        icon="Plus"
        :disabled="CategoryStore.c3ID ? false : true"
        @click="addSpu"
        >添加SPU</el-button
      >
      <el-table border style="margin: 10px 0" :data="records">
        <el-table-column
          label="序号"
          type="index"
          width="80px"
        ></el-table-column>
        <el-table-column label="SPU名称" prop="spuName"></el-table-column>
        <el-table-column
          label="SPU描述"
          prop="description"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作">
          <!-- row为已有spu对象 -->
          <template #="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="Plus"
              title="添加SKU"
              @click="addSku(row)"
            ></el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              title="修改SPU"
              @click="updateSpu(row)"
            ></el-button>
            <el-button
              type="primary "
              size="small"
              icon="View"
              title="查看SKU列表"
            ></el-button>
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              title="删除SPU"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 9]"
        :size="size"
        :disabled="false"
        layout=" prev, pager, next, jumper,->,sizes,total, "
        :total="total"
        @size-change="handleSizeChange"
        @current-change="getSPUList"
      />
    </div>
    <SpuForm ref="spu" v-show="scene == 1" @changeScene="changeScene"></SpuForm>
    <SkuForm ref="sku" v-show="scene == 2" @changeScene="changeScene"></SkuForm>
  </el-card>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { reqSPUList } from "@/api/product/spu";
import useCategoryStore from "@/store/modules/category";
import type {
  HasSpuResponseData,
  Records,
  SpuData,
} from "@/api/product/spu/type";
import SpuForm from "./spuForm.vue";
import SkuForm from "./skuForm.vue";
//场景值
let scene = ref<number>(2);
let CategoryStore = useCategoryStore();
//获取子组件实例SpuForm
let spu = ref<any>();
let sku = ref<any>();
let currentPage = ref<number>(1);
let size = ref<string>("default");
let limit = ref<number>(3);
let records = ref<Records>([]);
let total = ref<number>(0);
watch(
  () => CategoryStore.c3ID,
  () => {
    if (!CategoryStore.c3ID) return;
    getSPUList();
  }
);
const getSPUList = async (pager = 1) => {
  currentPage.value = pager;
  if (!CategoryStore.c3ID) {
    records.value = [];
    total.value = 0;
    return;
  }

  let result: HasSpuResponseData = await reqSPUList(
    currentPage.value,
    limit.value,
    CategoryStore.c3ID
  );

  if (result.code == 200) {
    records.value = result.data.records || [];
    total.value = result.data.total || 0;
  }
};

// 分页大小改变处理
const handleSizeChange = (newSize: number) => {
  limit.value = newSize;
  getSPUList();
};
const addSpu = () => {
  scene.value = 1;
  spu.value.initAddSpu(CategoryStore.c3ID); //调用子组件的方法初始化数据(确保添加spu时el-select中有数据)
};
const changeScene = (obj: any) => {
  scene.value = obj.flag; //切换场景
  if (obj.params == "update") {
    //更新就留在当前页
    getSPUList(currentPage.value);
  } else {
    getSPUList(1);
  }
  //再次获取全部已有spu数据
};

const updateSpu = (row: SpuData) => {
  scene.value = 1; //修改spu
  console.log(row);
  //调用子组件方法获取完整的spu数组
  spu.value.initHasSpuData(row);
};
// 当前页改变处理
// const handleCurrentChange = (newPage: number) => {
//   currentPage.value = newPage;

// };

//添加sku
const addSku = (row: SpuData) => {
  scene.value = 2;
  //调用子组件方法初始化 添加sku数据
  sku.value.initSkuData(CategoryStore.c1ID, CategoryStore.c2ID, row);
  console.log(row);
};
</script>
<style scoped></style>
