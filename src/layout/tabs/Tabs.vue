<template>
    <el-tabs v-model="activeTab" @tab-click="clickBtn" type="card" closable @tab-remove="removeTab">
        <el-tab-pane
            v-for="item in tabsList"
            :key="item.path"
            :label="item.title"
            :name="item.path"
        ></el-tab-pane>
    </el-tabs>
</template>
<script setup lang='ts'>
import { ref, computed, watch, onMounted } from 'vue'
import { useStore } from '@/store';
import { useRoute, useRouter } from 'vue-router';
import { ITable } from '@/store/type';
const route = useRoute();
const router = useRouter();
const store = useStore();
//获取tabs数据
const tabsList = computed(() => {
    // return store.getters['getTabs']
    return store.getters['tabs/getTabs']
})
//当前激活的选项卡，他跟当前激活的路由是一样的；
const activeTab = ref('');
const setActiveTab = () => {
    activeTab.value = route.path;
}
//删除选项卡
const removeTab = (targetName: string) => {
    if (targetName === '/dashboard') return;
    //选项卡数据列表
    const tabs = tabsList.value;
    //当前激活的选项卡
    let activeName = activeTab.value;
    if (activeName === targetName) {
        tabs.forEach((tab: ITalbe, index: number) => {
            if (tab.path === targetName) {
                const nextTab = tabs[index + 1] || tabs[index - 1]
                if (nextTab) {
                    activeName = nextTab.path
                }
            }
        })
    }
    //重新设置当前激活的选项卡
    activeTab.value = activeName
    //重新设置选项卡数据
    store.state.tabs.tabsList = tabs.filter((tab: ITable) => tab.path !== targetName)
    //跳转路由
    router.push({ path: activeName })
}
//添加选项卡
const addTab = () => {
    //从当前路由获取path和title
    const { path, meta } = route;
    //通过vuex设置
    const tab: ITable = {
        path: path,
        title: meta.title as string
    }
    // store.commit('addTabe', tab);
    store.commit('tabs/addTabe', tab)
}
//监听路由的变化
watch(() => route.path, () => {
    //设置激活的选项卡
    setActiveTab();
    //把当前路由添加到选项卡数据
    addTab();
})
//解决刷新数据丢失的问题
const beforeRefresh = () => {
    if (route.path != '/login') {
        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('tabsView', JSON.stringify(tabsList.value))
        })
        let tabSesson = sessionStorage.getItem("tabsView");
        if (tabSesson) {
            let oldTabs = JSON.parse(tabSesson);
            if (oldTabs.length > 0) {
                store.state.tabs.tabsList = oldTabs;
            }
        }
    }
}
onMounted(() => {
    //解决刷新选项卡数据丢失的问题
    beforeRefresh();
    //设置激活的选项卡
    setActiveTab();
    //把当前路由添加到选项卡数据
    addTab();
})
//选项卡点击事件
const clickBtn = (tab: any) => {
    const { props } = tab;
    //跳转路由
    console.log(props.name)
    router.push({ path: props.name })
}
</script>
<style scoped lang='scss'>
:deep(.el-tabs__header) {
    margin: 0px;
}
:deep(.el-tabs__item) {
    height: 26px !important;
    line-height: 26px !important;
    text-align: center !important;
    border: 1px solid #d8dce5 !important;
    margin: 0px 3px !important;
    color: #495060;
    font-size: 12px !important;
    padding: 0xp 10px !important;
}
:deep(.el-tabs__nav) {
    border: none !important;
}
:deep(.is-active) {
    border-bottom: 1px solid transparent !important;
    border: 1px solid #42b983 !important;
    background-color: #42b983 !important;
    color: #fff !important;
}
:deep(.el-tabs__item:hover) {
    color: #495060 !important;
}
:deep(.is-active:hover) {
    color: #fff !important;
}
</style>