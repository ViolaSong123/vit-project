import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'
// const routes: Array<RouteRecordRaw> = [
//     {
//         path: '/login',
//         name: 'login',
//         component: ()=>import('@/views/login/Login.vue')
//     },
//     {
//         path: '/',
//         component: Layout,
//         redirect: '/dashboard',
//         children: [
//           {
//             path: '/dashboard',
//             component: () => import('@/layout/dashboard/Index.vue'),
//             name: 'dashboard',
//             meta: {
//               title: '首页',
//               icon: '#icondashboard'
//             }
//           }
//         ]
//     },
//     {
//         path: "/system",
//         component: Layout,
//         name: "system",
//         meta: {
//             title: "系统管理",
//             icon: "el-icon-menu",
//             roles: ["sys:manage"],
//             parentId: 0,
//         },
//         children: [
//             {
//                 path: "/department",
//                 component: () => import('@/views/system/department/department.vue'),
//                 name: "department",
//                 meta: {
//                     title: "机构管理",
//                     icon: "el-icon-document",
//                     roles: ["sys:dept"]
//                 },
//             },
//             {
//                 path: "/userList",
//                 component: () => import('@/views/system/User/UserList.vue'),
//                 name: "userList",
//                 meta: {
//                     title: "用户管理",
//                     icon: "el-icon-s-custom",
//                     roles: ["sys:user"]
//                 },
//             },
//             {
//                 path: "/roleList",
//                 component: () => import('@/views/system/Role/RoleList.vue'),
//                 name: "roleList",
//                 meta: {
//                     title: "角色管理",
//                     icon: "el-icon-s-tools",
//                     roles: ["sys:role"]
//                 },
//             },
//             {
//                 path: "/menuList",
//                 component: () => import('@/views/system/Menu/MenuList.vue'),
//                 name: "menuList",
//                 meta: {
//                     title: "权限管理",
//                     icon: "el-icon-document",
//                     roles: ["sys:menu"]
//                 },
//             },
//         ],
//     },
//     {
//         path: "/goods",
//         component: Layout,
//         name: "goods",
//         meta: {
//             title: "商品管理",
//             icon: "el-icon-document",
//             roles: ["sys:goods"]
//         },
//         children: [
//             {
//                 path: "/goodCategory",
//                 component: () => import('@/views/goods/goodsCategory/goodsCategoryList.vue'),
//                 name: "goodCategory",
//                 meta: {
//                     title: "商品分类",
//                     icon: "el-icon-document",
//                     roles: ["sys:goodsCategory"]
//                 },
//             },
//         ],
//     },
//     {
//         path: "/systenConfig",
//         component: Layout,
//         name: "systenConfig",
//         meta: {
//             title: "系统工具",
//             icon: "el-icon-document",
//             roles: ["sys:systenConfig"]
//         },
//         children: [
//             {
//                 path: "/document",
//                 component: () => import('@/views/system/config/systemDocument.vue'),
//                 name: "http://42.193.158.170:8089/swagger-ui/index.html",
//                 meta: {
//                     title: "接口文档",
//                     icon: "el-icon-document",
//                     roles: ["sys:document"]
//                 },
//             },
//         ],
//     }
// ]
export const constantRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: '/dashboard',
                component: () => import('@/layout/dashboard/Index.vue'),
                name: 'dashboard',
                meta: {
                    title: '首页',
                    icon: '#icondashboard'
                }
            }
        ]
    },
    {
        path: '/login',
        name:'login',
        component: () => import('@/views/login/login.vue'),
    }
]
//创建
const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes
})
export default router