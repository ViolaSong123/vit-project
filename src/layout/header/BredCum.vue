<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in tabs">{{item.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup lang='ts'>
import { ref,watch,Ref} from 'vue'
import { useRoute,RouteLocationMatched } from 'vue-router';
//定义面包屑导航数据
const tabs :Ref<RouteLocationMatched[]> = ref([]);
const route = useRoute();
const getBredcurm = ()=>{
    //获取所有有meta和title
    let mached = route.matched.filter(item => item.meta && item.meta.title);
    //判断第一个是否是首页,如果不是，构造一个
    const first = mached[0];
    if(first && first.path !== '/dashboard'){
        //构造一个
        mached = [{path: '/dashboard',meta:{title:'首页'}} as any].concat(mached);
    }
    //设置面包屑导航数据
    tabs.value = mached;

}
getBredcurm();
//路由发生变化，重新获取面包屑导航数据
watch(()=>route.path,()=>getBredcurm());
</script>
<style scoped lang='scss'>

</style>