<template>
  <el-card style="height: 80px">
    <el-form :inline="true" class="form">
      <el-form-item label="用户名:">
        <el-input placeholder="请输入用户名" style="width: 800px" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small">搜索</el-button>
        <el-button type="info" size="small">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin-top: 10px">
    <el-button type="primary" size="small" @click="AddUser">添加用户</el-button>
    <el-button type="danger" size="small">批量删除</el-button>
    <el-table border style="margin: 10px 0" :data="UserArr">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="ID" width="80px" prop="id"></el-table-column>
      <el-table-column label="用户名字" prop="name"></el-table-column>
      <el-table-column label="用户昵称" prop="username"></el-table-column>
      <el-table-column label="创建时间" prop="createTime"></el-table-column>
      <el-table-column label="更新时间" prop="updateTime"></el-table-column>
      <el-table-column label="操作" width="300px">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            icon="User"
            @click="AssignRole(row)"
            >分配角色</el-button
          >
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateUser(row)"
            >编辑</el-button
          >
          <el-button type="primary" size="small" icon="Delete">删除</el-button>
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
      @current-change="getHasUser"
    />
    <el-drawer v-model="drawer">
      <template #header>
        <h5>{{ UserForm.id ? "编辑用户" : "添加用户" }}</h5>
      </template>
      <template #default>
        <el-form
          :model="UserForm"
          style="margin-top: 0"
          :rules="rules"
          ref="FormRef"
        >
          <el-form-item label="用户姓名: " prop="name">
            <el-input
              placeholder="请填写用户名字"
              v-model="UserForm.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户昵称:" prop="username"
            ><el-input
              placeholder="请填写用户昵称"
              v-model="UserForm.username"
            ></el-input
          ></el-form-item>
          <el-form-item label="用户密码:" prop="password" v-if="!UserForm.id"
            ><el-input
              placeholder="请填写用户密码"
              v-model="UserForm.password"
              type="password"
            ></el-input
          ></el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button plain @click="cancel">取消</el-button>
          <el-button type="primary" @click="Confirm">确认</el-button>
        </div>
      </template>
    </el-drawer>
    <el-drawer v-model="drawerRole">
      <template #header>
        <h5>分配角色用户</h5>
      </template>
      <template #default>
        <el-form style="margin-top: 0">
          <el-form-item label="用户姓名: ">
            <el-input v-model="UserForm.username" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="角色列表:"
            ><el-input
              placeholder="请填写用户昵称"
              v-model="UserForm.roleName"
            ></el-input>
          </el-form-item>
          <el-form-item label="职位列表">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >
              全选
            </el-checkbox>
            <el-checkbox-group
              v-model="roleIdList"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox
                v-for="role in allRoleIdList"
                :key="role"
                :label="role"
                :value="role"
              >
                {{ role.roleName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button plain @click="cancel">取消</el-button>
          <el-button type="primary" @click="saveRole">确认</el-button>
        </div>
      </template>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from "vue";
import {
  reqGetUserList,
  reqAddOdUpdateUser,
  reqAssignRole,
  reqAssignUserRole,
} from "@/api/acl/user/index";
import type {
  UserResponseData,
  UserData,
  Records,
  User,
  AllRole,
  SetRoleData,
  AssignRoleResponseData,
} from "@/api/acl/user/type";
import { ElMessage } from "element-plus";
//分页器
let currentPage = ref(1);
let limit = ref(5);
let total = ref(50);
let UserArr = ref<Records[]>([]);
//分配角色抽屉
let drawerRole = ref(false);
const handler = () => {
  getHasUser();
};
const getHasUser = async (pager = 1) => {
  let result: UserResponseData = await reqGetUserList(
    currentPage.value,
    limit.value
  );
  console.log(result);
  let UserData: UserData = result.data;
  total.value = UserData.total;
  currentPage.value = pager;
  limit.value = UserData.size;
  UserArr.value = UserData.records;
};
//获取form组件实例  ——因为其对外暴露了一个validator
//可以保证表单验证通过后再发送请求 exposes
let FormRef = ref<any>();
//抽屉 --新增用户
const drawer = ref(false);
let UserForm = reactive<User>({
  name: "",
  username: "",
  password: "",
  id: 0,
  roleName: "",
  phone: "",
});
const AddUser = () => {
  drawer.value = true;
  Object.assign(UserForm, { id: 0, name: "", username: "", password: "" });
  //点击添加按钮时，drawer打开，清空表单校验提醒
  //此时还没有UserForm  所以需要nextTick()
  nextTick(() => {
    FormRef.value.clearValidate();
  });
};
const Confirm = async () => {
  //表单校验
  await FormRef.value.validate();
  let result = await reqAddOdUpdateUser(UserForm);
  console.log(result);
  if (result.code == 200) {
    drawer.value = false;
    // getHasUser(UserForm.id ? currentPage.value : 1);
    ElMessage({
      message: UserForm.id ? "更新成功" : "添加成功",
      type: "success",
    });
    window.location.reload(); //系统自动刷新，守卫检查修改的用户信息能否登录，不能则退回登录页面
    //但我的路由守卫估计写的不对，没法回退到登录页面
  } else {
    drawer.value = false;
    ElMessage({
      message: result.message,
      type: "error",
    });
  }
};
//编辑用户信息
const updateUser = (row: User) => {
  drawer.value = true;

  Object.assign(UserForm, row);
  nextTick(() => {
    FormRef.value.clearValidate();
  });
};
//取消按钮的回调
const cancel = () => {
  drawer.value = false;
};

//表单校验规则
const validatorUsername = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 5) {
    callback();
  } else {
    callback(new Error("用户名不能少于5位"));
  }
};
const rules = {
  name: [
    {
      required: true,

      trigger: "blur",

      message: "昵称不能为空",
    },
  ],
  username: [
    {
      required: true,

      trigger: "blur",
      validator: validatorUsername,
    },
  ],
  password: [
    {
      required: true,

      trigger: "blur",
      min: 6,
      message: "密码不能少于6位",
    },
  ],
};

//分配角色
const setRoleData = ref<SetRoleData>();
const AssignRole = async (row: User) => {
  drawerRole.value = true;
  console.log(row);
  //将角色内容填入drawer表单
  Object.assign(UserForm, row);
  //获取所有角色信息
  let result: AssignRoleResponseData = await reqAssignRole(
    UserForm.id as number
  );
  if (result.code == 200) {
    allRoleIdList.value = result.data.allRolesList; //全部角色
    roleIdList.value = result.data.assignRoles; //用户已有角色
  }
  setRoleData.value = {
    userId: UserForm.id,
    roleIdList: roleIdList.value.map((item) => item.id), //仅将选中的职务id存为roleIdList
  };
};

const saveRole = async () => {
  drawerRole.value = false;
  roleIdList.value = [1];
  let result = await reqAssignUserRole(setRoleData.value as SetRoleData);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "分配职务成功",
    });
    getHasUser(currentPage.value);
  }
  console.log(result);
};
import type { CheckboxValueType } from "element-plus";

const checkAll = ref(false);
const isIndeterminate = ref(true); //未全选时的横线
//为用户分配角色
let allRoleIdList = ref<AllRole[]>([]); //全部角色
let roleIdList = ref<any[]>([0]); //存储选中的角色
//角色列表check方法
const handleCheckAllChange = (val: CheckboxValueType) => {
  roleIdList.value = val ? allRoleIdList.value : [];
  isIndeterminate.value = false;
};
const handleCheckedCitiesChange = (value: CheckboxValueType[]) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === allRoleIdList.value.length;
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < allRoleIdList.value.length;
};

onMounted(() => {
  getHasUser();
});
</script>
<style scoped>
.form {
  display: flex;
  align-items: space-between;
  align-items: center;
}
</style>
