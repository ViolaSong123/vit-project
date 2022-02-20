<template>
	<MenuLogo v-if="!isCollapse" class="layout-logo"></MenuLogo>
  <el-menu
        default-active="activeIdex"
        class="el-menu-vertical-demo"
				 :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
				background-color="#304156"
				router
      >
        <MenuItem :menuList="menuList"></MenuItem>
      </el-menu>
</template>
<script setup lang="ts">
import { ref,reactive, computed, watch} from 'vue'
import MenuItem from './MenuItem.vue'
import MenuLogo from './MenuLogo.vue'
import {useRoute} from 'vue-router'
import { useStore } from '@/store';
const store = useStore();
// 获取当前路由
const route = useRoute();
//获取菜单收缩状态
const isCollapse = computed(()=>{
    return store.getters['getCollapse']
})
//获取激活的菜单
const activeIdex = computed(()=>{
  console.log(323232)
    const {path}= route;
    return path;
})
const menuList = computed(() =>{
    return store.getters['menu/getMenuList']
})
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 230px;
  min-height: 400px;
  background-color: rgb(48, 65, 86);
}
.el-menu {
  border-right: none;
}

:deep(.el-sub-menu .el-sub-menu__title){
	 color: #f4f4f5 !important;
}

:deep(.el-menu .el-menu-item){
	color: #bfcbd9;
}
/* 菜单点中文字的颜色 */

:deep(.el-menu-item.is-active){
	color: #409eff !important;
}
/* 当前打开菜单的所有子菜单颜色 */

:deep(.is-opened .el-menu-item){
	background-color: #1f2d3d !important;
}
/* 鼠标移动菜单的颜色 */

:deep(.el-menu-item:hover){
	background-color: #001528 !important;
}
@keyframes logoAnimation {
  0% {
		transform: scale(0);
	}
	50% {
		transform: scale(1);
	}
	100% {
		transform: scale(1);
	}
}
.layout-logo {
    animation: logoAnimation 1s ease-out;
}
</style>