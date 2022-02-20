import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import {store,key} from './store/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons'
import { appendFile } from 'fs'
import { getToken,cleanSession } from './utils/auth'

const app = createApp(App);
app.use(router).use(store, key).use(ElementPlus).mount('#app')
// 全局注册图标组件
// typeof 和 keyof(获取某种类型的所有键，返回的是一个联合类型)
Object.keys(Icons).forEach((key)=>{
    // app.component(key, Icons[key])
    app.component(key, Icons[key as keyof typeof Icons])
})

const whiteList = ['/login'];
router.beforeEach(async (to, from, next) => {
    let token = getToken();
    if (token) { //token存在
        if (to.path === "/login" || to.path === "/") {
            next({ path: '/' })
        } else {
            console.log(store.state)
            let hasRoles = store.state.user.permissions && store.state.user.permissions.length > 0;
            if (hasRoles) {
                next();
            } else {
                try {
                    await store.dispatch('user/getInfo')
                    await store.dispatch('menu/getMenuList',router)
                    //确保动态添加的路由已经被完全加载上去
                    next({ ...to, replace: true })
                } catch (error) {
                    //重置token
                    cleanSession();
                    //跳到登录
                    next({ path: '/login' })
                }

            }
        }
    } else { //token不存在 , 跳转的时候，需要注意 BredCum.vue里面判断first
        //判断是否存在白名单中
        if (whiteList.includes(to.path)) { //存在白名单中
            next();
        } else { //不存在白名单中,去登录
            next({ path: '/login' })
        }
    }
})