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
              :src="SERVER_URL + row.logoUrl"
              alt="加载失败"
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作" prop="action">
          <template #="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateTrademark(row)"
            ></el-button>

            <el-popconfirm
              :title="`您确定要删除已有品牌${row.tmName}信息吗`"
              width="250px"
              icon="Warning"
              @confirm="removeTrademark(row.id)"
            >
              <template #reference>
                <el-button
                  type="danger"
                  size="small"
                  icon="Delete"
                  @click="deleteTrademark"
                ></el-button>
              </template>
            </el-popconfirm>
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
        <el-form-item label="品牌logo" label-width="100px" prop="logoUrl">
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
              :src="SERVER_URL + trademarkParams.logoUrl"
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
import { ref, onMounted, reactive, nextTick } from "vue";
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from "../../../../../src/api/product/trademark";
import type {
  Records,
  TradeMarkResponseData,
  TradeMark,
} from "../../../../../src/api/product/trademark/type";
import { ElMessage } from "element-plus";
import type { UploadProps } from "element-plus";

// 定义服务器地址常量
const SERVER_URL = import.meta.env.VITE_SERVE;

let currentPage = ref<number>(1);
//每页展示多少数据
let limit = ref<number>(2);
let disabled = ref<boolean>(false);
let total = ref<number>(0);
let dialogTableVisible = ref<boolean>(false);
let trademarkArr = ref<Records>([]);
let formRef = ref();
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
    console.log("已有品牌", trademarkArr.value);
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
//添加品牌
const addTrademark = () => {
  dialogTableVisible.value = true;
  // 清除所有数据，确保是添加模式
  trademarkParams.id = undefined;
  trademarkParams.tmName = "";
  trademarkParams.logoUrl = "";
  // formRef.value?.clearValidate();
  nextTick(() => {
    formRef.value.clearValidate("tmName");
    formRef.value.clearValidate("logoUrl");
  });
};
//修改品牌
const updateTrademark = (row: TradeMark) => {
  nextTick(() => {
    formRef.value.clearValidate("tmName");
    formRef.value.clearValidate("logoUrl");
  });
  dialogTableVisible.value = true;
  // ES^语法合并对象
  Object.assign(trademarkParams, row);

  // 或者也可以逐个赋值（两种方法都可以）
  // trademarkParams.id = row.id;
  // trademarkParams.tmName = row.tmName;
  // trademarkParams.logoUrl = row.logoUrl;
};
//删除品牌
const deleteTrademark = () => {
  console.log("删除品牌功能待实现");
};
const cancel = () => {
  dialogTableVisible.value = false;
};
const confirm = async () => {
  formRef.value.validate();

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
  trademarkParams.logoUrl = response.data;
  ElMessage.success("图片上传成功");
  formRef.value.clearValidate("logoUrl");
};
//获得组件实例

const validatorTmName = (value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack();
  } else {
    callBack(new Error("品牌名称至少2个字符"));
  }
  return true;
};

const validatorlogoURL = (value: any, callBack: any) => {
  if (value) {
    callBack();
  } else {
    callBack(new Error("请上传品牌logo"));
  }
  return true;
};
const formRules = {
  tmName: [
    {
      required: true,
      trigger: "blur",
      validator: validatorTmName,
    },
  ],
  logoUrl: [{ required: true, trigger: "change", validator: validatorlogoURL }],
};
//删除已有品牌 气泡
const removeTrademark = async (id: number) => {
  let result = await reqDeleteTrademark(id);

  if (result.code == 200) {
    ElMessage.success("删除品牌成功");
    // 如果当前页只有一条数据且不是第一页，则跳转到上一页
    const newPage =
      trademarkArr.value.length > 1
        ? currentPage.value
        : Math.max(currentPage.value - 1, 1);
    getHasTrademark(newPage);
  } else {
    ElMessage.error(`删除品牌失败: ${result.message || "未知错误"}`);
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
