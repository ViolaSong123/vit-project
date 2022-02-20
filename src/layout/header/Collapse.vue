<template>
  <el-icon
    class="icons"
    @click="changeIcon"
  >
    <component :is="status ? Fold : Expand" />
  </el-icon>
</template>
<script setup lang='ts'>
import { useStore } from '@/store';
import { Fold,Expand } from '@element-plus/icons'
import { ref,computed } from 'vue';
const store = useStore();
// const status = ref(true);
const status = computed(()=>{
  return store.getters['getCollapse']
})
//搜索按钮切换事件
const changeIcon = ()=>{
  console.log(status.value)
  // status.value = !status.value;
  store.commit('setCollopse',!status.value)
}
</script>
<style scoped lang='scss'>
.icons{
  display: flex;
  align-items: center;
  font-size: 22px;
  color: #303133;
  cursor: pointer;
}
</style>