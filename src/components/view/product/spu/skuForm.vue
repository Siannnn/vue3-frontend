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
            v-for="(item, index) in attrArr"
            :key="item.id"
            :label="item.attrName"
            :value="item.AttrId"
            ><el-select>
              <el-option
                v-for="(attrValue, index) in item.attrValueList"
                :key="attrValue.id"
                :label="attrValue.valueName"
                :value="attrValue.id"
              ></el-option> </el-select
          ></el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form>
          <el-form-item
            v-for="(item, index) in saleAttr"
            :key="item.id"
            :label="item.saleAttrName"
          >
            <el-select multiple>
              <el-option
                v-for="(saleAttrValue, index) in item.spuSaleAttrValueList"
                :label="saleAttrValue.saleAttrValueName"
                :key="saleAttrValue.id"
                value="red"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-table border :data="imgArr" style="margin-bottom: 20px">
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
          <template #="{ row, $index }">
            <el-button type="primary" size="small">设置默认</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-form-item>
        <el-button type="primary" icon="Plus">保存</el-button>
        <el-button type="danger" icon="Close" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reqAttr } from "@/api/product/attr";
import { reqSpuImageList, reqSpuHasSaleAttr } from "@/api/product/spu";
import { ref, reactive } from "vue";
import type { SaleAttr, SkuData } from "@/api/product/spu/type";
let $emit = defineEmits(["changeScene"]);
//存储平台属性、销售属性、
let attrArr = ref<any[]>([]);
let saleAttr = ref<SaleAttr[]>([]);
let imgArr = ref<any[]>([]);
//收集sku参数
let skuParams = reactive<SkuData>({
  tmId: "",
  skuName: "",
  category3Id: "",
  spuId: "",
  price: 0,
  weight: 0,
  skuDesc: "",
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
  skuImageList: [],
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
  saleAttr.value = result1.data;

  //获取图片列表
  let result2 = await reqSpuImageList(spu.id);
  imgArr.value = result2.data;
};
defineExpose({ initSkuData });
</script>
<style scoped></style>
