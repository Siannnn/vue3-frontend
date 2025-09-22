<template>
  <el-card>
    <el-input
      placeholder="角色名称"
      style="width: 800px; margin-bottom: 10px; margin-right: 10px"
      clearable
      v-model="Rolekeyword"
    />
    <el-button type="primary" size="small" @click="search">搜索</el-button>
    <el-button type="info" size="small" @click="reset">重置</el-button>
  </el-card>
  <el-card style="margin: 10px 0px">
    <el-button type="primary" size="small" icon="Plus" @click="addRole"
      >添加角色</el-button
    >

    <el-table border style="margin: 10px 0" :data="RoleArr">
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="id" width="80px" prop="id"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="创建时间" prop="createTime"></el-table-column>
      <el-table-column label="更新时间" prop="updateTime"></el-table-column>
      <el-table-column label="操作" width="320px">
        <template #="{ row, $index }">
          <el-button type="text" size="small" icon="View" @click="Assign"
            >分配权限</el-button
          >
          <el-button
            type="text"
            size="small"
            icon="Edit"
            @click="updateRole(row)"
            >编辑</el-button
          >

          <el-popconfirm
            :title="`你确定要删除${row.roleName}用户吗？`"
            @confirm="deleteRole(row)"
          >
            <template #reference
              ><el-button type="text" size="small" icon="Delete"
                >删除</el-button
              >
            </template>
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
      @current-change="getHasRole"
    />
    <el-dialog
      v-model="AddFormDialogue"
      :title="AddForm.id ? '修改职位' : '添加职位'"
      width="500"
    >
      <el-form :model="AddForm" :rules="rules" ref="FormRef" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input
            v-model="AddForm.roleName"
            autocomplete="off"
            placeholder="请填写角色名称"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="confirm">确定</el-button>
          <el-button type="danger" @click="cancel">取消</el-button>
        </div>
      </template>
    </el-dialog>
    <el-drawer v-model="drawer">
      <template #header>
        <h5>分配权限</h5>
      </template>
      <template #default>
        <el-tree
          style="max-width: 600px"
          :data="data"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="[5]"
          :props="defaultProps"
        />
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button plain @click="drawer = false">取消</el-button>
          <el-button type="primary">确认</el-button>
        </div>
      </template>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick, reactive } from "vue";
import {
  reqGetRoleList,
  reqAddOrUpdateRole,
  reqDeleteRole,
  reqGetMenuList,
} from "@/api/acl/role/index";
import type { RoleResponseData, Role, RoleData } from "@/api/acl/role/type";
import useLayoutSettingStore from "@/store/modules/setting";
import { ElMessage } from "element-plus";
let currentPage = ref(1);
let limit = ref(3);
let total = ref(0);
let RoleArr = ref<Role[]>([]);
let Rolekeyword = ref(""); //搜索角色信息
let AddFormDialogue = ref(false);
let drawer = ref(false);
let AddForm = ref<RoleData>({
  roleName: "",
  remark: "",
});
let FormRef = ref();
//获取页面角色信息
const getHasRole = async (pager = 1) => {
  let result: RoleResponseData = await reqGetRoleList(
    currentPage.value,
    limit.value,
    Rolekeyword.value
  );
  let RoleData = result.data;
  total.value = RoleData.total;
  RoleArr.value = RoleData.records;
  RoleArr.value = RoleData.records;
  currentPage.value = pager;
};
onMounted(() => {
  getHasRole();
});

const handler = (newSize: number) => {
  limit.value = newSize;
  getHasRole();
};
//表单校验
const rules = reactive({
  roleName: [{ required: true, message: "角色名称不能为空", trigger: "blur" }],
});
//搜索名称
const search = () => {
  getHasRole();
};
const layoutSettingStore = useLayoutSettingStore();
//重置搜索
const reset = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh;
};
//新增用户
const addRole = () => {
  AddFormDialogue.value = true;
  Object.assign(AddForm.value, {
    id: 0,
    roleName: "",
  });
  // AddForm.value = {
  //   roleName: "",
  //   remark: "",
  // };
  nextTick(() => {
    FormRef.value?.clearValidate("roleName");
  });
};
//更新用户
const updateRole = (row: Role) => {
  AddFormDialogue.value = true;
  // AddForm.value = {
  //   role_id: row.id,
  //   roleName: row.roleName,
  //   remark: row.remark,
  // };
  Object.assign(AddForm.value, row);
  nextTick(() => {
    FormRef.value?.clearValidate("roleName");
  });
};

const confirm = async () => {
  if (!FormRef.value) return;
  try {
    await FormRef.value.validate();
    AddFormDialogue.value = false;
    let result = await reqAddOrUpdateRole(AddForm.value);
    console.log(result);
    if (result.code == 200) {
      ElMessage.success(AddForm.value.id ? "修改成功" : "添加成功");
    } else {
      ElMessage.error(AddForm.value.id ? "修改失败" : "添加失败");
    }
    getHasRole(currentPage.value);
  } catch (fields) {
    ElMessage.error(AddForm.value.id ? "修改失败" : "添加失败");
  }
};

const cancel = () => {
  AddFormDialogue.value = false;
};
//删除角色
const deleteRole = async (row: Role) => {
  let result = await reqDeleteRole(row.id as number);
  if (result.code == 200) {
    ElMessage.success("删除成功");
    getHasRole(currentPage.value);
  } else {
    ElMessage.error("删除失败");
  }
};
//分配权限
const Assign = async () => {
  drawer.value = true;
  let result = await reqGetMenuList();
  let Tree = result.data;
  console.log(result);
  let TreeProp = {
    children: Tree.children,
    label: Tree.name,
  };
};
const defaultProps = {
  children: "children",
  label: "label",
};
const data = [
  {
    id: 1,
    label: "Level one 1",
    children: [
      {
        id: 4,
        label: "Level two 1-1",
        children: [
          {
            id: 9,
            label: "Level three 1-1-1",
          },
          {
            id: 10,
            label: "Level three 1-1-2",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Level one 2",
    children: [
      {
        id: 5,
        label: "Level two 2-1",
      },
      {
        id: 6,
        label: "Level two 2-2",
      },
    ],
  },
  {
    id: 3,
    label: "Level one 3",
    children: [
      {
        id: 7,
        label: "Level two 3-1",
      },
      {
        id: 8,
        label: "Level two 3-2",
      },
    ],
  },
];
</script>
<style scoped></style>
