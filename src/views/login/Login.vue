<template>
  <div class="logincontainer">
    <el-form
      ref="loginFormRef"
      class="loginForm"
      :model="loginModel"
      :rules="rules"
      :inline="false"
    >
      <el-form-item>
        <div class="loginTitle">
          系统登录
        </div>
      </el-form-item>
      <el-form-item prop="username">
        <el-input
          v-model="loginModel.username"
          placeholder="请输入账户"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginModel.password"
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item prop="code">
        <el-row :gutter="20">
          <el-col :span="16">
            <el-input
              v-model="loginModel.code"
              placeholder="请输入验证码"
            />
          </el-col>
          <el-col :span="8">
            <!-- <el-input placeholder="请输入验证码" v-model="loginModel.code"></el-input> -->
            <img
              :src="imgSrc"
              @click="getImage"
            >
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row
          :gutter="20"
          style="margin-top: 10px;"
        >
          <el-col :span="12">
            <el-button
              class="mybtn"
              type="primary"
              size="default"
              @click="login"
            >
              登录
            </el-button>
          </el-col>
          <el-col :span="12">
            <el-button
              class="mybtn"
              size="default"
            >
              取消
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang='ts'>
import useImage from '@/composables/login/useImage';
import useBaseLogin from '@/composables/login/useBaseLogin';
import useLogin from '@/composables/login/useLogin';

//验证码
const {imgSrc,getImage} = useImage();

//登录基础数据
const {loginModel,rules,loginFormRef} = useBaseLogin();

//登录提交
const {login} = useLogin(loginModel);

</script>
<style scoped lang='scss'>
.logincontainer {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .loginForm {
        height: 320px;
        width: 400px;
        border-radius: 10px;
        padding: 20px 35px;
        box-shadow: 0 0 25px #cac6c6;
        .loginTitle {
            font-size: 24px;
            font-weight: 600;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .mybtn{
            width: 100%;
        }
    }
}
</style>