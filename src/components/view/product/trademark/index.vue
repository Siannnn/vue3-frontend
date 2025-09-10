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
        <!--默认展示数据用div -->
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
              @click="updateTrademark(row)"
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
    <el-dialog
      v-model="dialogTableVisible"
      :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
      width="500"
    >
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
            :headers="getUploadHeaders()"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="'http://127.0.0.1:10086' + trademarkParams.logoUrl"
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
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
} from "../../../../../src/api/product/trademark";
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
let dialogTableVisible = ref<boolean>(false);
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

const addTrademark = () => {
  dialogTableVisible.value = true;
  // 清除所有数据，确保是添加模式
  trademarkParams.id = undefined;
  trademarkParams.tmName = "";
  trademarkParams.logoUrl = "";
};
const updateTrademark = (row: TradeMark) => {
  dialogTableVisible.value = true;
  // ES^语法合并对象
  Object.assign(trademarkParams, row);

  // 或者也可以逐个赋值（两种方法都可以）
  // trademarkParams.id = row.id;
  // trademarkParams.tmName = row.tmName;
  // trademarkParams.logoUrl = row.logoUrl;
};

const deleteTrademark = () => {
  console.log("删除品牌功能待实现");
};
const cancel = () => {
  dialogTableVisible.value = false;
};
const confirm = async () => {
  try {
    // 验证必填字段
    if (!trademarkParams.tmName || !trademarkParams.tmName.trim()) {
      ElMessage.error("品牌名称不能为空");
      return;
    }

    // 暂时注释logo验证，先测试只有名称的情况
    // if (!trademarkParams.logoUrl || !trademarkParams.logoUrl.trim()) {
    //   ElMessage.error("品牌logo不能为空，请先上传图片");
    //   return;
    // }
    let result: any = await reqAddOrUpdateTrademark(trademarkParams);

    if (result.code == 200) {
      ElMessage({
        type: "success",
        message: trademarkParams.id ? "品牌修改成功" : "品牌添加成功",
      });
      getHasTrademark(trademarkParams.id ? currentPage.value : 1);
      dialogTableVisible.value = false;
    } else if (result.code == 205) {
      // 服务繁忙，提示用户稍后重试，但不关闭对话框
      console.error("服务繁忙，详细信息:", result);
      ElMessage({
        type: "warning",
        message: "服务器繁忙，请稍后点击确认重试",
        duration: 5000,
      });
    } else {
      console.error("品牌操作失败，详细信息:", result);
      ElMessage.error(
        `品牌操作失败: ${result.message || "未知错误，状态码：" + result.code}`
      );
    }
  } catch (error: any) {
    console.error("品牌操作出现异常:", error);
    console.error("异常详情:", error.response || error.message || error);
    ElMessage.error("品牌操作出现异常: " + (error.message || "请检查网络连接"));
  }
};

let trademarkParams = reactive<TradeMark>({
  tmName: "",
  logoUrl: "",
});
const getUploadHeaders = () => {
  const token = localStorage.getItem("TOKEN") || "";

  return {
    token: token,
    Authorization: "Bearer " + token,
  };
};
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
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
const handleAvatarSuccess: UploadProps["onSuccess"] = (response) => {
  if (response.code === 200) {
    trademarkParams.logoUrl = response.data;
    ElMessage.success("图片上传成功");
  } else {
    ElMessage.error("图片上传失败: " + (response.message || "未知错误"));
  }
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
