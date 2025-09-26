<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="sku名称">
        <el-input
          placeholder="请输入sku名称"
          v-model="skuParams.skuName"
        ></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input
          placeholder="价格(元)"
          type="number"
          v-model="skuParams.price"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量">
        <el-input
          placeholder="重量(克)"
          type="number"
          v-model="skuParams.weight"
        ></el-input>
      </el-form-item>
      <el-form-item label="sku描述">
        <el-input
          placeholder="sku描述"
          type="textarea"
          v-model="skuParams.skuDesc"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true">
          <el-form-item
            v-for="item in attrArr"
            :key="item.id"
            :label="item.attrName"
            ><el-select v-model="item.attrIdAndValueId" style="width: 200px">
              <el-option
                v-for="attrValue in item.attrValueList"
                :key="attrValue.id"
                :label="attrValue.valueName"
                :value="`${item.id}:${attrValue.id}`"
              ></el-option> </el-select
          ></el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form>
          <el-form-item
            v-for="item in saleArr"
            :key="item.id"
            :label="item.saleAttrName"
          >
            <el-select
              multiple
              v-model="item.saleIdAndValueId"
              style="width: 300px"
            >
              <el-option
                v-for="saleAttrValue in item.spuSaleAttrValueList"
                :label="saleAttrValue.saleAttrValueName"
                :key="saleAttrValue.id"
                :value="`${item.id}:${saleAttrValue.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-table border :data="imgArr" style="margin-bottom: 20px" ref="table">
        <el-table-column type="selection" width="80px" align-center="true">
        </el-table-column>
        <el-table-column label="图片">
          <template #="{ row }">
            <img style="width: 100px; height: 100px" :src="row.imgUrl" alt="" />
          </template>
        </el-table-column>
        <el-table-column label="名称">
          <template #="{ row }">
            <span>{{ row.imgName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #="row">
            <el-button type="primary" size="small" @click="handler(row)"
              >设置默认</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-form-item>
        <el-button type="primary" icon="Plus" @click="save">保存</el-button>
        <el-button type="danger" icon="Close" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reqAttr } from "@/api/product/attr";
import {
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAddSku,
} from "@/api/product/spu";
import { ref, reactive } from "vue";
import type { SaleAttr, SkuData } from "@/api/product/spu/type";
import { ElMessage } from "element-plus";
let $emit = defineEmits(["changeScene"]);
//存储平台属性、销售属性、
let attrArr = ref<any[]>([]);
let saleArr = ref<SaleAttr[]>([]);
let imgArr = ref<any[]>([]);
//获取table组件实例
let table = ref<any>(null);
//收集sku参数
let skuParams = reactive<SkuData>({
  tmId: "",
  skuName: "",
  category3Id: "",
  spuId: "",
  price: "",
  weight: "",
  skuDesc: "",
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
  skuImageList: [],
  skuDefaultImg: "",
});
const cancel = () => {
  $emit("changeScene", { flag: 0, params: "" });
};

//子组件方法
const initSkuData = async (
  c1Id: number | string,
  c2Id: number | string,
  spu: any
) => {
  //收集id
  skuParams.category3Id = spu.category3Id;
  skuParams.spuId = spu.id;
  skuParams.tmId = spu.tmId;
  //获取平台属性
  let result = await reqAttr(c1Id, c2Id, spu.category3Id);
  attrArr.value = result.data;

  //获取销售属性
  let result1 = await reqSpuHasSaleAttr(spu.id);
  saleArr.value = result1.data;

  //获取图片列表
  let result2 = await reqSpuImageList(spu.id);
  imgArr.value = result2.data;
};
defineExpose({ initSkuData });

//设置默认图片
const handler = (row: any) => {
  //复选框选中  使用的是table的方法，不是事件
  //为保证唯一：点击时全清空再选中
  imgArr.value.forEach((item) => {
    table.value.toggleRowSelection(item, false);
  }); //清空
  table.value.toggleRowSelection(row);

  //收集图片地址
  skuParams.skuDefaultImg = row.imgUrl;
};
//保存
const save = async () => {
  //平台属性值的id
  skuParams.skuAttrValueList = attrArr.value.reduce((prev: any, next: any) => {
    if (next.attrIdAndValueId) {
      let [attrId, valueId] = next.attrIdAndValueId.split(":");
      prev.push({ attrId: attrId, valueId: valueId });
    }
    return prev;
  }, []);
  console.log(skuParams.skuAttrValueList);
  //销售属性值的id
  skuParams.skuSaleAttrValueList = saleArr.value.reduce(
    (prev: any, next: any) => {
      if (next.saleIdAndValueId && next.saleIdAndValueId.length > 0) {
        next.saleIdAndValueId.forEach((item: string) => {
          let [saleAttrId, saleAttrValueId] = item.split(":");
          prev.push({ saleAttrId, saleAttrValueId });
        });
      }
      return prev;
    },
    []
  );
  //发送添加请求
  let result = await reqAddSku(skuParams);
  console.log(result);
  if (result.code == 200) {
    ElMessage.success("添加成功");
    $emit("changeScene", { flag: 0, params: "update" });
  } else {
    ElMessage.error(result.message || "添加失败");
  }
};
</script>
<style scoped></style>
