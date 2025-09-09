<template>
  <div class="login">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <!--element栅格系统分为24 ,xs小于68时占0位-->
      <el-col :span="12" :xs="24">
        <el-form
          class="login-form"
          :rules="rules"
          ref="loginForm"
          :model="Loginform"
        >
          <h1>Hello</h1>
          <h2>欢迎使用路桥卫士</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="Loginform.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="Loginform.password"
              :show-password="passwordValue"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" @click="login"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
// 使用默认导入，因为 user.ts 使用的是 export default
import useUserStore from "../../../store/modules/user";
import { useRouter, useRoute } from "vue-router";
import { ElNotification } from "element-plus";
import { getTime } from "../../../utils/time";
let $router = useRouter();
let $route = useRoute(); //获取路由对象
let useStore = useUserStore();
let passwordValue: boolean = true;
let Loginform = reactive({
  username: "admin",
  password: "111111",
});
let loginForm = ref();
const validatorUsername = (rule: any, value: any, callback: any) => {
  //自定义校验规则
  //rule是校验对象 value是表单元素单元文本内容
  if (value.length >= 5) {
    console.log("用户名校验通过", rule, value);
    callback();
  } else {
    callback(new Error("用户名必须为5-10位数字"));
  }
};
const rules = {
  username: [
    // {
    //   required: true,

    //   message: "用户名不得少于6个字符",
    //   trigger: "blur",
    // },
    // {
    //   required: true,
    //   min: 6,
    //   max: 10,
    //   message: "账户长度至少6位",
    //   trigger: "change",
    // },
    { trigger: "blur", vadidator: validatorUsername },
  ],
  password: {
    required: true,
    min: 6,
    message: "密码长度至少为6位",
    trigger: "change",
  },
};
let loading = ref(false);
async function login() {
  let result = await loginForm.value.validate();
  loading.value = true; //开始加载
  if (result) {
    try {
      await useStore.userLogin(Loginform);
      // 登录成功后跳转到首页
      let redirect: any = $route.query.redirect;
      $router.push({ path: redirect || "/" });
      ElNotification({
        message: "登陆成功",
        type: "success",
        title: `Hi,${getTime()}好`,
      });
      loading.value = false;
    } catch (error) {
      loading.value = false;
      console.error("登录失败:", error);
      ElNotification({
        message: (error as Error).message || "用户名或密码错误",
        type: "error",
      });
    }
  }
}
// 验证表单数据
// if (!Loginform.username || !Loginform.password) {
//   ElNotification({
//     message: "请输入用户名和密码",
//     type: "warning",
//   });
//   return;
// }
</script>
<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: #6abbde;
  background: linear-gradient(to right, hsl(199, 36%, 53%), #66a1dc);
  background-size: cover;
}
.login-form {
  position: relative;
  width: 80%;
  top: 30vh;
  /* background:url('') */
  background-color: rgb(103, 163, 143);
  padding: 20px;
  h1 {
    color: white;
    font-size: 40px;
  }
  h2 {
    font-size: 20px;
    color: white;
    margin: 20px 0px;
  }
  button {
    width: 100%;
  }
}
</style>
