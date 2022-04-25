<template>
  <el-container class="layout">
    <el-aside width="auto" class="asside">
      <MenuBar />
    </el-aside>
    <el-container>
      <el-header class="header">
        <Header />
      </el-header>
      <el-main class="main">
        <Tabs />
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
// setup语法糖，引入的组件可以直接使用，无需再通过components进行注册，并且无法指定当前组件的名字，他会自动以文件名为主，不在需要写name属性了
// setup语法糖中，定义的数据和方法可以直接在模板中使用，无需要return
import Header from "./header/header.vue";
import MenuBar from "./menu/MenuBar.vue";
import Tabs from "./tabs/Tabs.vue";
</script>
<style lang="scss" scoped>
.layout {
  height: 100%;
  .asside {
    background-color: rgb(48, 65, 86);
  }
  .header {
    background-color: white;
  }
  .main {
    background-color: white;
  }
}
</style>
