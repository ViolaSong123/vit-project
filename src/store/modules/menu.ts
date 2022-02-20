// !RouteRecordRaw 为vue3中内置的类型接口
import { RouteRecordRaw } from 'vue-router'
// ! ActionContext 是action的执行上下文，相当于一个容器里面存放的是action在执行时用到的对象
import {ActionContext} from 'vuex'
import { RootState } from "../index";
import {getMenuListApi} from '@/api/menu/menu'
import Layout from '@/layout/Index.vue'
const modules = import.meta.glob('../../views/**/*.vue')

export type MenuState = {
    count: number,
    collapse: boolean,
    menuList: any
}

export const state:MenuState = {
    count: 0,
    collapse: false,
    menuList: [
        {
            path: '/dashboard',
            component: "Layout",
            meta: {
                title: "首页",
                icon: "HomeFilled",
                roles: ["sys:manage"]
            },
            children: []
        }
    ]
}
//定义mutations
export const mutations = {
    setCount(state: MenuState, count: number) {
        state.count = count;
    },
    //设置collapse
    setCollapse: (state: MenuState, collapse: boolean) => {
        state.collapse = collapse;
    },
    setMenuList: (state: MenuState, routes: Array<RouteRecordRaw>) => {
        state.menuList = state.menuList.concat(routes)
    }
}
//定义actions
export const actions = {
    getMenuList({ commit }: ActionContext<MenuState, RootState>, router: any) {
        return new Promise((resolve, reject) => {
            //存的是有权限的路由，是一个数组
            getMenuListApi().then(res => {
                // console.log(res)
                let accessedRoutes;
                if (res.code == 200) {
                    // 动态生成路由
                    accessedRoutes = filterAsyncRoutes(res.data, router);
                    commit('setMenuList', accessedRoutes)
                }
                resolve(accessedRoutes)
            }).catch(error => {
                reject(error)
            })
        })
    }
}
export const getters = {
    getCount(state: MenuState) {
        return state.count;
    },
    //获取collapse
    getCollapse: (state: MenuState) => {
        return state.collapse;
    },
    getMenuList: (state: MenuState) => {
        return state.menuList;
    }
}
export function filterAsyncRoutes(routes: RouteRecordRaw[], router: any) {
    const res: Array<RouteRecordRaw> = []
    //循环每一个路由
    routes.forEach((route: any) => {
        const tmp = { ...route }
        const component = tmp.component;
        if (route.component) {
            if (component == 'Layout') {
                tmp.component = Layout;
            } else {
                tmp.component = modules[`../../views${component}.vue`]
            }
        }
        //判断是否有下级
        if (tmp.children) {
            tmp.children = filterAsyncRoutes(tmp.children, router)
        }
        router.addRoute(tmp)
        res.push(tmp)
    })
    return res
}

export default{
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}