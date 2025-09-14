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
              @click="updateAttr(row)"
              icon="Edit"
            ></el-button>
            <el-popconfirm
              :title="`确定要删除属性 ${row.attrName} 吗？`"
              width="250px"
              @confirm="deleteAttr(row.id)"
            >
              <template #reference>
                <el-button size="small" type="danger" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
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
              <template #="{ row, $index }">
                <el-input
                  placeholder="请你输入属性值名称"
                  v-model="row.valueName"
                  v-if="row.flag"
                  @blur="toLook(row, $index)"
                  :ref="(vc: any) => (inputArr[$index] = vc)"
                ></el-input>
                <div
                  v-else
                  @click="toEdit(row, $index)"
                  style="cursor: pointer; padding: 4px; min-height: 20px"
                >
                  {{ row.valueName }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="属性值操作">
              <template #="{ row, $index }">
                <el-button
                  size="small"
                  type="danger"
                  icon="Delete"
                  @click="attrParams.attrValueList.splice($index, 1)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button
            type="primary"
            size="default"
            @click="save"
            :disabled="attrParams.attrValueList.length > 0 ? false : true"
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
import { watch, ref, reactive, nextTick, onBeforeUnmount } from "vue";
import { ElMessage } from "element-plus";
import { reqAttr, reqAddOrUpdateAttr, reqDeleteAttr } from "@/api/product/attr";
import type {
  AttrResponseData,
  Attr,
  AttrValue,
} from "@/api/product/attr/type";
const categoryStore = useCategoryStore();
let attrArr = ref<Attr[]>([]);
//存储el-input 组件实例--表单聚焦功能
let inputArr = ref<any>([]);

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
//取消添加属性值
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

const toLook = (row: AttrValue, $index: number) => {
  if (row.valueName.trim() == "") {
    attrParams.attrValueList.splice($index, 1); //删除为空的数组元素
    ElMessage({
      type: "warning",
      message: "属性值不能为空",
    });
    return;
  }
  let repeat = attrParams.attrValueList.find((item) => {
    if (item != row) {
      //将当前元素从数组中扣除，不然一定重复
      return item.valueName === row.valueName;
    }
  });
  if (repeat) {
    attrParams.attrValueList.splice($index, 1); //删除重复的数组元素
    ElMessage({
      type: "warning",
      message: "属性值不能重复",
    });
    return;
  }
  row.flag = false;
};
const toEdit = (row: AttrValue, $index: number) => {
  row.flag = true;
  //响应式数据发生变化，获取更新的dom实例
  nextTick(() => {
    inputArr.value[$index].focus(); //点击div立即聚焦
  });
};
//添加属性值按钮
const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: "",
    flag: true,
  });
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus(); //新增的输入框立即聚焦
  });
};
const save = async () => {
  const result = await reqAddOrUpdateAttr(attrParams);

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
// 编辑属性
const updateAttr = (row: Attr) => {
  scene.value = 1;
  // 深拷贝属性数据到表单，避免直接修改原数据
  //ES6->Object.assign 进行对象合并
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)));
  // 为每个属性值添加编辑状态
  attrParams.attrValueList.forEach((item) => {
    item.flag = false;
  });
};

const deleteAttr = async (id: number) => {
  const result = await reqDeleteAttr(id);

  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "删除属性成功",
    });
    // 重新获取属性列表
    await getAttr();
  } else {
    ElMessage({
      type: "error",
      message: result.message || "删除失败",
    });
  }
};
onBeforeUnmount(() => {
  categoryStore.$reset();
});
</script>
<style scoped></style>
