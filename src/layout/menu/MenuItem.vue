<template>
  <template
    v-for="menu in menuList"
    :key="menu.path"
  >
    <el-sub-menu
      v-if="menu.children && menu.children.length"
      :index="menu.path"
    >
      <template #title>
        <el-icon><avatar /></el-icon>
        <span>{{ menu.meta.title }}</span>
      </template>
      <menu-item :menu-list="menu.children" />
    </el-sub-menu>
    <el-menu-item
      v-else
      style="color: #f4f4f5"
      :index="menu.path"
    >
      <!-- <i :class="menu.meta.icon" /> -->
      <el-icon><avatar /></el-icon>
      <template #title>
        {{ menu.meta.title }}
      </template>
    </el-menu-item>
  </template>
</template>
<script setup lang="ts">
defineProps(['menuList'])
</script>
<style scoped>
.icons{
	width: 24px;
	height: 18px;
	margin-right: 5px;
}
</style>