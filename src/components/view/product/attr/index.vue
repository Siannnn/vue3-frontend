<template>
  <Category :scene="scene" />
  <el-card style="margin: 10px 0">
    <div v-show="scene == 0">
      <el-button
        type="primary"
        icon="Plus"
        @click="addAttr"
        :disabled="!categoryStore.c3ID ? true : false"
        >添加属性</el-button
      >
      <el-table border style="margin: 10px 0" :data="attrArr">
        <el-table-column label="序号" type="index" align="center" width="80px">
        </el-table-column>
        <el-table-column label="属性名称" width="120px" prop="attrName">
        </el-table-column>
        <el-table-column label="属性值名称">
          <template #="{ row }">
            <el-tag
              style="margin: 5px"
              v-for="(item, itemIndex) in row.attrValueList"
              :key="item.id || itemIndex"
              >{{ item.valueName }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #="{ row }">
            <el-button
              size="small"
              type="primary"
              @click="editAttr(row)"
              icon="Edit"
            ></el-button>
            <el-button
              size="small"
              type="warning"
              @click="deleteAttr(row.id)"
              icon="Delete"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="scene == 1">
      <el-form :inline="true">
        <el-form-item label="属性名称">
          <el-input
            placeholder="请输入属性名称"
            type="small"
            v-model="attrParams.attrName"
          ></el-input>
          <el-button
            :disabled="!attrParams.attrName ? true : false"
            margin-top="40px"
            type="primary"
            size="default"
            icon="Plus"
            @click="addAttrValue"
            >添加属性值</el-button
          >
          <el-button type="primary" size="default" icon="Close">取消</el-button>
          <el-table
            border
            style="margin: 10px 0"
            :data="attrParams.attrValueList"
          >
            <el-table-column
              width="80px"
              type="index"
              label="序号"
            ></el-table-column>
            <el-table-column label="属性值名称">
              <template #="{ row }">
                <el-input
                  placeholder="请你输入属性值名称"
                  v-model="row.valueName"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="属性值操作"></el-table-column>
          </el-table>
          <el-button type="primary" size="default" @click="save"
            >保存</el-button
          >
          <el-button type="primary" size="default" @click="cancel"
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import useCategoryStore from "@/store/modules/category";
import { watch, ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import {
  reqAttr,
  reqAddOrUpdateAttr,
} from "@/components/view/product/attr/index.ts";
import type {
  AttrResponseData,
  Attr,
} from "@/components/view/product/attr/type";
const categoryStore = useCategoryStore();
let attrArr = ref<Attr[]>([]);
const addAttr = () => {
  Object.assign(attrParams, {
    //清空原先数据
    attrName: "",
    attrValueList: [],
    categoryId: categoryStore.c3ID,
    categoryLevel: 3,
  });
  scene.value = 1;
};
watch(
  () => categoryStore.c3ID,
  () => {
    //有三级分类才发请求
    attrArr.value = [];
    if (categoryStore.c3ID) {
      getAttr();
    }
  }
);
//获取已有的
const getAttr = async () => {
  const { c1ID, c2ID, c3ID } = categoryStore;
  const result: AttrResponseData = await reqAttr(c1ID, c2ID, c3ID);
  console.log(result);
  if (result.code === 200) {
    attrArr.value = result.data;
  }
};

const cancel = () => {
  scene.value = 0;
};
//卡片组件呈现
const scene = ref<number>(0);
//收集新增的属性数据
let attrParams = reactive<Attr>({
  attrName: "",
  attrValueList: [],
  categoryId: "",
  categoryLevel: 3,
});
//添加属性值按钮
const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: "",
  });
};
const save = async () => {
  const result = await reqAddOrUpdateAttr(attrParams);
  console.log(result);
  if (result.code == 200) {
    scene.value = 0;
    getAttr();
    ElMessage({
      type: "success",
      message: attrParams.id ? "修改属性成功" : "添加属性成功",
    });
  } else {
    ElMessage({
      type: "error",
      message: result.message,
    });
  }
};
</script>
<style scoped></style>
