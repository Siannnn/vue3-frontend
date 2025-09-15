<template>
  <el-form label-width="80px">
    <el-form-item label="SPU名称">
      <el-input placeholder="请输入SPU名称"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="tradeMark_value">
        <el-option
          v-for="item in AllTradeMark"
          :key="item.id"
          :label="item.tmName"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input type="textarea" placeholder="请输入你的描述"></el-input>
    </el-form-item>

    <el-form-item label="SPU图标">
      <el-upload
        v-model:file-list="imgList"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select>
        <el-option
          v-for="item in saleAttr"
          :key="item.id"
          :label="item.saleAttrName"
        ></el-option>
        <el-option label="oppo"></el-option>
        <el-option label="vivo"></el-option>
      </el-select>
      <el-button
        style="margin-left: 10px"
        type="primary"
        size="default"
        icon="Plus"
        >添加属性值</el-button
      >
      <el-table border style="margin: 10px 0" :data="saleAttr">
        <el-table-column label="序号" type="index" align="center" width="80px">
        </el-table-column>
        <el-table-column
          prop="saleAttrName"
          label="销售属性名字"
          width="120px"
        ></el-table-column>
        <el-table-column label="销售属性值">
          <template #="{ row }">
            <el-tag
              style="margin: 5px"
              v-for="(item, itemIndex) in row.spuSaleAttrValueList"
              :key="item.id || itemIndex"
              >{{ item.saleAttrValueName }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px"></el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default">保存</el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import type {
  HasSaleAttr,
  SpuData,
  TradeMark,
  SpuImg,
  AllTradeMark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  SaleAttr,
} from "@/api/product/spu/type";
import {
  reqSpuImageList,
  reqAllTradeMark,
  reqSpuHasSaleAttr,
  reqAllSaleAttr,
} from "@/api/product/spu";
import { ref } from "vue";
import { Plus } from "@element-plus/icons-vue";

defineProps(["scene"]);
const cancel = () => {
  $emit("changeScene", 0);
};
let $emit = defineEmits(["changeScene"]);
let tradeMark_value = ref<string>("");
//存储所有数据
let AllTradeMark = ref<TradeMark[]>([]);
//照片墙
let imgList = ref<SpuImg[]>([]);
//已有spu销售属性
let saleAttr = ref<SaleAttr[]>([]);
//全部销售属性
let allSaleAttr = ref<HasSaleAttr>();
const initHasSpuData = async (spu: SpuData) => {
  let result: AllTradeMark = await reqAllTradeMark(); //全部品牌数据
  console.log("品牌列表", result);
  //一个品牌下商品图片
  let result1: SpuHasImg = await reqSpuImageList(spu.id as number);
  console.log("商品图片", result1);
  //销售属性
  let result2: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number);
  console.log("销售属性", result2);
  //全部销售属性
  let result3: HasSaleAttrResponseData = await reqAllSaleAttr();
  console.log("全部销售属性", result3);
  AllTradeMark.value = result.data;
  imgList.value = result1.data;
  saleAttr.value = result2.data;
  allSaleAttr.value = result3.data;
};
defineExpose({
  initHasSpuData,
});
</script>
<style scoped></style>
