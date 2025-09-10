<template>
  <div>
    <el-card style="max-width: 98%">
      <el-button type="primary" size="default" icon="Plus" @click="addTrademark"
        >添加品牌</el-button
      >
      <el-table :data="trademarkArr" style="margin: 10px 0px" border>
        <el-table-column
          label="序号"
          width="80px"
          align="center"
          type="index"
        ></el-table-column>
        <!-- 默认展示数据用div -->
        <el-table-column label="品牌名称" prop="tmName"> </el-table-column>
        <el-table-column label="品牌logo">
          <template #="{ row }">
            <img
              :src="'http://127.0.0.1:10086' + row.logoUrl"
              alt="加载失败"
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作" prop="action">
          <template #="{ row, $index }">
            <el-button
              type="primary"
              size="mini"
              icon="Edit"
              @click="updateTrademark"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              icon="Delete"
              @click="deleteTrademark"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="getHasTrademark"
        @size-change="sizeChange"
        v-model:current-page="currentPage"
        v-model:page-size="limit"
        :page-sizes="[1, 2, 3]"
        :disabled="disabled"
        :background="true"
        layout=" prev, pager, next, jumper,->,sizes,total, "
        :total="total"
      />
    </el-card>
    <!-- 对话框组件--添加品牌 修改品牌 -->
    <el-dialog v-model="dialogTableVisible" title="添加品牌" width="500">
      <el-form style="width: 80%">
        <el-form-item label="品牌名称" label-width="80px">
          <el-input
            placeholder="请输入品牌名称"
            v-model="trademarkParams.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌logo" label-width="80px">
          <!-- action图片上传路径书写/api -->
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" size="small" @click="cancel">取消</el-button>
        <el-button type="primary" size="small" @click="confirm">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { reqHasTrademark } from "../../../../../src/api/product/trademark";
import type {
  Records,
  TradeMarkResponseData,
  TradeMark,
} from "../../../../../src/api/product/trademark/type";
import { ElMessage } from "element-plus";
import type { UploadProps } from "element-plus";

let currentPage = ref<number>(1);
//每页展示多少数据
let limit = ref<number>(2);
let disabled = ref<boolean>(false);
let total = ref<number>(0);

let trademarkArr = ref<Records>([]);
//获取已有品牌的接口封装成一个函数
const getHasTrademark = async (pager = 1) => {
  //当前页码 下拉时没有传参默认第一页，其余传了参数，点第几页就传到第几页
  currentPage.value = pager;
  let result: TradeMarkResponseData = await reqHasTrademark(
    currentPage.value,
    limit.value
  );
  if (result.code == 200) {
    total.value = result.data.total;
    // currentPage.value = result.data.current;
    trademarkArr.value = result.data.records;
  }
  console.log(result);
};
onMounted(() => {
  try {
    getHasTrademark();
  } catch (error) {
    console.error("Error fetching trademarks:", error);
  }
});
// const handleCurrentChange = () => {
//   //当前页码发生变化时候再次获取数据
//   getHasTrademark();
// };
//还有一个是下拉菜单变化时也再次获取数据
const sizeChange = () => {
  // currentPage.value = 1;
  getHasTrademark();
};

let dialogTableVisible = ref<boolean>(false);
const addTrademark = () => {
  dialogTableVisible.value = true;
};
const updateTrademark = () => {
  dialogTableVisible.value = true;
};
const cancel = () => {
  dialogTableVisible.value = false;
};
const confirm = () => {
  dialogTableVisible.value = false;
};

let trademarkParams = reactive<TradeMark>({
  tmName: "",
  logoUrl: "",
});

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  // 上传文件之前 可以约束文件大小、类型
  console.log(rawFile);
  if (
    rawFile.type !== "image/png" &&
    rawFile.type !== "image/jpg" &&
    rawFile.type !== "image/jpeg"
  ) {
    ElMessage.error("Avatar picture must be JPG/png/jpeg format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage.error("Avatar picture size can not exceed 4MB!");
    return false;
  }
  return true;
};
const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  // 上传成功的回调
  console.log(response);
  //图片上传成功后返回图片地址
  trademarkParams.logoUrl = response.data;
};
</script>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
