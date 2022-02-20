import { ITable } from '../type/index'
//定义state
export type TabsState = {
    tabsList: Array<ITable>
}
export const state: TabsState = {
    tabsList: []
}
//定义mutations
export const mutations = {
    addTabe: (state: TabsState, tab: ITable) => {
        //判断是否已经存在，如果不存在，才放入
        if (state.tabsList.some(item => item.path === tab.path)) return;
        state.tabsList.push(tab);
    }
}

//定义actios
export const actions = {}

//定义getters
export const getters = {
    //获取tabs
    getTabs: (state: TabsState) => {
        return state.tabsList;
    }
}
export default{
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}
