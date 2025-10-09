<template>
  <el-form label-width="80px" :model="SpuParams">
    <el-form-item label="SPU名称">
      <el-input
        placeholder="请输入SPU名称"
        v-model="SpuParams.spuName"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="SpuParams.tmId" placeholder="请选择品牌">
        <!-- 收集用户选择的id :value，然后收集到上面的tmId -->
        <el-option
          v-for="item in AllTradeMark"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        v-model="SpuParams.description"
        placeholder="请输入你的描述"
      ></el-input>
    </el-form-item>

    <el-form-item label="SPU图标">
      <el-upload
        v-model:file-list="imgList"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="handlerUpload"
        :on-success="handleUploadSuccess"
        :headers="uploadHeaders"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img
          w-full
          :src="dialogImageUrl"
          style="width: 100%; height: 100%"
          alt="Preview Image"
        />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select
        v-model="saleAttrIdAndName"
        :placeholder="
          unSelectSaleAttr.length
            ? `还未选择${unSelectSaleAttr.length}个`
            : '无'
        "
      >
        <el-option
          v-for="item in unSelectSaleAttr"
          :key="item.id"
          :label="item.name"
          :value="`${item.id}:${item.name}`"
        ></el-option>
      </el-select>
      <el-button
        style="margin-left: 10px"
        type="primary"
        size="default"
        icon="Plus"
        @click="addSaleAttr"
        :disabled="saleAttrIdAndName ? false : true"
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
              style="margin: 0 5px"
              closable
              v-for="(item, itemIndex) in row.spuSaleAttrValueList"
              :key="item.id || itemIndex"
              @close="row.spuSaleAttrValueList.splice(itemIndex, 1)"
              >{{ item.saleAttrValueName }}</el-tag
            >
            <!-- <el-input
              v-if="inputVisible"
              ref="InputRef"
              v-model="inputValue"
              class="w-20"
              size="small"
              @keyup.enter="handleInputConfirm"
              @blur="handleInputConfirm"
            /> -->
            <el-input
              ref="InputRef"
              placeholder="请输入属性值"
              v-if="row.flag == true"
              v-model="row.saleAttrValue"
              class="w-20"
              size="small"
              @blur="toLook(row)"
            />
            <el-button
              v-else
              icon="Plus"
              type="primary"
              size="small"
              @click="toEdit(row)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template #="$index">
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              @click="saleAttr.splice($index, 1)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button
        :disabled="saleAttr.length > 0 ? false : true"
        type="primary"
        @click="save"
        size="default"
        >保存</el-button
      >
      <el-button type="primary" size="defaul t" @click="cancel">取消</el-button>
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
  reqAddOrUpdateSpu,
} from "@/api/product/spu";
import { ref, computed, nextTick } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import type { InputInstance } from "element-plus";

defineProps(["scene"]);

let $emit = defineEmits(["changeScene"]);

//存储所有数据
let AllTradeMark = ref<TradeMark[]>([]);
//照片墙
let imgList = ref<SpuImg[]>([]);
//已有spu销售属性
let saleAttr = ref<SaleAttr[]>([]);
//存储已有spu对象
let SpuParams = ref<SpuData>({
  category3Id: "",
  spuName: "",
  description: "",
  tmId: "",
  spuImageList: [],
  spuSaleAttrList: [],
});
const addSaleAttr = async () => {
  SpuParams.value.spuSaleAttrList = saleAttr.value;
  let [id, name] = saleAttrIdAndName.value.split(":"); //切割成数组
  saleAttr.value.push({
    // spuId: SpuParams.value.id,
    baseSaleAttrId: id,
    saleAttrName: name,
    spuSaleAttrValueList: [],
  });
  //清空
  saleAttrIdAndName.value = "";
};
//全部销售属性
let allSaleAttr = ref<HasSaleAttr[]>([]);
const initHasSpuData = async (spu: SpuData) => {
  SpuParams.value = spu;
  let result: AllTradeMark = await reqAllTradeMark(); //全部品牌数据
  //一个品牌下商品图片
  let result1: SpuHasImg = await reqSpuImageList(spu.id as number);
  //销售属性
  let result2: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number);
  //全部销售属性
  let result3: HasSaleAttrResponseData = await reqAllSaleAttr();
  AllTradeMark.value = result.data;
  allSaleAttr.value = result3.data;
  imgList.value = result1.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    };
  });
  saleAttr.value = result2.data;
};

// 配置上传请求头
const uploadHeaders = computed(() => {
  const token = localStorage.getItem("TOKEN");
  return {
    token: token || "",
  };
});
//照片墙点击预览时触发的钩子
let dialogVisible = ref(false);
let dialogImageUrl = ref(""); //预览图片地址
const handlePictureCardPreview = (file: any) => {
  dialogVisible.value = true;
  dialogImageUrl.value = file.url;
};
const handleRemove = (file: any, fileList: any) => {
  console.log(file, fileList);
};
const handlerUpload = (file: any) => {
  // 限制上传图片格式
  const isJpgOrPng =
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "image/jpg";
  if (!isJpgOrPng) {
    ElMessage.error("上传图片只能是 JPG、PNG、JPG 格式!");
    return false;
  }
  // 限制上传图片大小
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    ElMessage.error("上传图片大小不能超过 2MB!");
    return false;
  }
  return true;
};
// 添加上传成功的回调
const handleUploadSuccess = (response: any, file: any) => {
  console.log("上传成功:", response);
  // 更新文件列表中的 URL
  const index = imgList.value.findIndex((item) => item.id === file.uid);
  if (index !== -1) {
    imgList.value[index].url = response.data; // 使用服务器返回的 URL
  }
};
//销售属性 过滤出未选择的 saleAttr
let unSelectSaleAttr = computed(() => {
  let unSelectAttr = allSaleAttr.value.filter((item) => {
    return saleAttr.value.every((item1) => {
      return item.name != item1.saleAttrName;
    });
  });
  return unSelectAttr;
});

//收集还未选择的销售属性
let saleAttrIdAndName = ref<string>("");

//tag 销售属性值
const InputRef = ref<InputInstance>();
const toEdit = (row: SaleAttr) => {
  row.flag = true;
  row.saleAttrValue = "";
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};
const toLook = (row: SaleAttr) => {
  row.flag = false;
  if ((row.saleAttrValue as string).trim() == "") {
    ElMessage.error("输入不能为空");
    return;
  }
  let repeat = row.spuSaleAttrValueList.some((item) => {
    return item.saleAttrValueName == row.saleAttrValue;
  });
  if (repeat) {
    ElMessage.error("输入重复");
    return;
  }
  if (row.saleAttrValue) {
    row.spuSaleAttrValueList.push({
      saleAttrValueName: row.saleAttrValue,
      baseSaleAttrId: row.baseSaleAttrId,
      // spuId: row.spuId,
    });
    row.saleAttrValue = "";
  }
};

//保存spuForm
const save = async () => {
  //照片墙
  SpuParams.value.spuImageList = imgList.value.map((item) => {
    return {
      id: item.id,
      imgName: item.name,
      imgUrl: (item as any).response?.data || item.url,
      spuId: SpuParams.value.id,
    };
  });

  //销售属性值
  SpuParams.value.spuSaleAttrList = saleAttr.value;
  // SpuParams.value.spuSaleAttrList.saleAttrValue = "11";
  //请求
  let result = await reqAddOrUpdateSpu(SpuParams.value);
  console.log(result);
  console.log(JSON.stringify(SpuParams.value, null, 2));

  if (result.code == 200) {
    ElMessage.success("保存成功");
    $emit("changeScene", {
      flag: 0,
      params: SpuParams.value.id ? "update" : "add",
    }); //通知父组件切换场景为0 并留在当前页面
  } else {
    ElMessage.error(result.message);
  }
};
//取消
const cancel = () => {
  $emit("changeScene", { flag: 0, params: "" });
};
//添加一个新的spu初始化请求方法
const initAddSpu = async (c3Id: number | string) => {
  SpuParams.value.category3Id = c3Id;
  let result: AllTradeMark = await reqAllTradeMark(); //全部品牌数据
  let result1: HasSaleAttrResponseData = await reqAllSaleAttr(); //全部销售属性数据
  //存储数据
  AllTradeMark.value = result.data;
  allSaleAttr.value = result1.data;
  //清空数据
  Object.assign(SpuParams.value, {
    id: undefined,
    spuName: "",
    description: "",
    tmId: "",
    spuImageList: [],
    spuSaleAttrList: [],
  });
  imgList.value = []; //因为spuImgList=imgList 照片墙存在imgList中
  saleAttr.value = [];
  saleAttrIdAndName.value = "";
};
defineExpose({
  initHasSpuData,
  initAddSpu,
});
</script>
<style scoped></style>
