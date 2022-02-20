// store.ts
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import tabs,{TabsState} from '../store/modules/tabs'
import menu,{MenuState} from '../store/modules/menu'
import user,{UserState} from '../store/modules/user'
import { CommonStore } from './help'
//是一种规范
export type RootState = {
    tabs:TabsState,
    menu:MenuState,
    user:UserState
}
//导入所有的模块
export const modules = {
    tabs: tabs,
    menu: menu,
    user:user
}
export const key: InjectionKey<Store<RootState>> = Symbol()

export const store = createStore<RootState>({
    modules
}) as CommonStore

// 定义自己的 `useStore` 组合式函数
export function useStore(){
    return baseUseStore(key) as CommonStore
}