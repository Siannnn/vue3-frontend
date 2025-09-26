<template>
  <el-card>
    <el-table border style="margin: 10px 0" :data="skuArr">
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
        prop="skuName"
      ></el-table-column>
      <el-table-column
        label="描述"
        show-overflow-tooltip
        width="150px"
        prop="skuDesc"
      ></el-table-column>
      <el-table-column label="默认图片">
        <template #="row">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 50px; height: 50px"
          />
        </template>
      </el-table-column>
      <el-table-column label="重量(g)" prop="weight"></el-table-column>
      <el-table-column label="价格(元)" prop="price"></el-table-column>
      <el-table-column label="操作" fixed="right" width="220px">
        <template #="{ row }">
          <el-button
            type="text"
            size="small"
            :icon="row.isSale == 1 ? 'Bottom' : 'Top'"
            @click="updateSale(row)"
          ></el-button>
          <el-button
            type="text"
            size="small"
            icon="Edit"
            @click="updateSku"
          ></el-button>
          <el-button
            type="text"
            size="small"
            icon="InfoFilled"
            @click="findSpu(row)"
          ></el-button>
          
          <el-popconfirm
            :title="`你确定要删除这个${row.skuName}吗？`"
            @confirm="removeSku(row.id)"
          >
            <template #reference><el-button
            type="text"
            size="small"
            icon="Delete"
      
          </el-button></template>
        </el-popconfirm>
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
      @current-change="getHasSku"
    />
    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
      <template #header>
        <h4>查看商品详情</h4>
      </template>
      <template #default>
        <el-row style="margin: 10px 0">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">1</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">2</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">3</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag style="margin: 5px 5px">1 </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="8">销售属性</el-col>
          <el-col :span="12">
            <el-tag
              type="info"
              style="margin: 5px 5px"
              v-for="item in skuSaleArr"
              :key="item.id"
              >{{ item.saleAttrName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="24">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item v-for="item in skuImgArr" :key="item.id">
                <h3 text="2xl" justify="center">{{ item.imgName }}</h3>
                <img
                  :src="item.imgUrl"
                  alt=""
                  style="
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    background: transparent;
                  "
                />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  reqSkuList,
  reqSaleSku,
  reqCancelSale,
  reqSkuInfo,
  reqSkuImageList,
  reqSkuSaleValueList,reqRemoveSku
} from "@/api/product/sku/index";
import type {
  SkuResponseData,
  SkuData,
  SkuInfoData,
  SkuSaleValueData,
  SaleAttr,
  SkuItem,
} from "@/api/product/sku/type";
import { ElMessage } from "element-plus";

//分页器
let currentPage = ref<number>(1);
let limit = ref<number>(3);
let total = ref<number>(0);
let skuArr = ref<SkuData[]>([]);
//抽屉内容
let skuInfo = ref<SkuData>();
let skuSaleArr = ref<SaleAttr[]>([]);
let skuImgArr = ref<SkuItem[]>([]);
//页面挂载时请求数据
onMounted(() => {
  getHasSku();
});
const getHasSku = async (pager = 1) => {
  currentPage.value = pager;
  let result: SkuResponseData = await reqSkuList(
    currentPage.value,
    limit.value
  );
  if (result.code == 200) {
    skuArr.value = result.data.records;
    total.value = result.data.total;
  }
};
const handler = (val: number) => {
  //改变每页条数
  limit.value = val;
  getHasSku();
};
//上架商品
const updateSale = async (row: SkuData) => {
  if (row.isSale == 1) {
    await reqCancelSale(row.id as number);
    ElMessage.success("商品下架成功");
    getHasSku(currentPage.value);
  } else {
    await reqSaleSku(row.id as number);
    ElMessage.success("商品上架成功");
    getHasSku(currentPage.value);
  }
};
const updateSku = () => {
  ElMessage.warning("修改功能待完善");
};
//控制抽屉
let drawer = ref<boolean>(false);
const findSpu = async (row: SkuData) => {

  drawer.value = true;
  let result: SkuInfoData = await reqSkuInfo(row.spuID as number);
  let imgResult = await reqSkuImageList(row.spuID as number);
  skuInfo.value = result.data;
  console.log(result);
  // skuImgArr = imgResult.data;

  let result1: SkuSaleValueData = await reqSkuSaleValueList(
    row.spuID as number
  );
  skuSaleArr.value = result1.data;
  skuImgArr.value = imgResult.data;
};
//删除属性
const removeSku = async (row: SkuData) => {
  let result = await reqRemoveSku((row as number));
  if (result.code == 200) {
    ElMessage.success("删除成功");
    getHasSku(currentPage.value);
  }
};
</script>
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
