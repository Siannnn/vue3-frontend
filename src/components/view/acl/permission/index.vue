<template>
  <el-table
    border
    style="width: 100%; margin: 10px 0"
    row-key="id"
    :data="PermissionArr"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
  >
    <el-table-column label="名称" prop="name"></el-table-column>
    <el-table-column label="权限值" prop="code"></el-table-column>
    <el-table-column label="修改时间" prop="updateTime"></el-table-column>
    <el-table-column label="操作" width="320px">
      <template #="{ row }">
        <el-button
          type="text"
          size="small"
          icon="View"
          @click="AddMenu(row)"
          :disabled="row.level == 4 ? true : false"
          >{{ row.level == 4 ? `添加功能` : `添加菜单` }}</el-button
        >
        <el-button type="text" size="small" icon="Edit" @click="update(row)"
          >编辑</el-button
        >

        <el-popconfirm
          :title="`你确定要删除 ${row.name} 吗？`"
          @confirm="deletePermission(row)"
        >
          <template #reference
            ><el-button type="text" size="small" icon="Delete">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
    v-model="AddMenuDialogue"
    :title="newMenu.id ? `编辑菜单` : `添加菜单`"
    width="500"
  >
    <el-form :model="newMenu" ref="FormRef" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="newMenu.name"
          autocomplete="off"
          placeholder="请填写菜单名称"
        />
      </el-form-item>
      <el-form-item label="权限值" prop="roleName">
        <el-input
          v-model="newMenu.code"
          autocomplete="off"
          placeholder="请填写权限值"
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
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { reqGetMenuList } from "@/api/acl/role";
import { ElMessage } from "element-plus";
import { reqAddOrUpdateNewMenu, reqDeleteMenu } from "@/api/acl/permission";
import type { Menu, Permission } from "@/api/acl/permission/type";
let PermissionArr = ref<any>([]);
let newMenu = ref<Menu>({
  name: "",
  code: "",
  level: 1,
  pid: 0,
});
let AddMenuDialogue = ref(false);
const getHasPermission = async () => {
  let result = await reqGetMenuList();
  console.log(result);
  if (result.code == 200) {
    PermissionArr.value = result.data;
  } else {
    ElMessage.error("获取权限列表失败");
  }
};
onMounted(() => {
  getHasPermission();
});

//新增菜单
const AddMenu = (row: Permission) => {
  AddMenuDialogue.value = true;
  Object.assign(newMenu.value, {
    id: undefined,
    name: "",
    code: "",
    level: row.level + 1,
    pid: row.id,
  });
  //   let result = await reqAddNewMenu(row);
  //   console.log(result);
  //   Object.assign(newMenu.value, result.data);
};
const update = (row: Permission) => {
  console.log("编辑", row);
  AddMenuDialogue.value = true;
  Object.assign(newMenu.value, row);
};
const confirm = async () => {
  let result = await reqAddOrUpdateNewMenu(newMenu.value);
  console.log(result);
  if (result.code == 200) {
    ElMessage.success("新增菜单成功");
    AddMenuDialogue.value = false;
    getHasPermission();
  } else {
    ElMessage.error("新增菜单失败");
  }
};
const cancel = () => {
  AddMenuDialogue.value = false;
};
//删除
const deletePermission = async (row: Permission) => {
  let result = await reqDeleteMenu(row.id as number);
  console.log(result);
  if (result.code == 200) {
    ElMessage.success("删除菜单成功");
    getHasPermission();
  } else {
    ElMessage.error("删除菜单失败");
  }
};
</script>
<style scoped></style>
