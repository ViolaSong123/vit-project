import { loginApi,getInfoApi } from "@/api/user/user";
import { LoginParm, LoginResult } from "@/api/user/UserModel";
import { Result } from "@/http/request";
import { ActionContext } from "vuex";
import { RootState } from "../index";
import { setToken,setUserId,setExpireTime } from '@/utils/auth';
//定义state类型
export type UserState = {
    token:string,
    userId:string,
    permissions:string[]
}
//定义state
export const state : UserState = {
    token:'',
    userId:'',
    permissions:[]
}
//定义mutations
export const mutations = {
    setToken(state:UserState,token:string){
        state.token = token;
    },
    setUserId(state:UserState,userId:string){
        state.userId = userId;
    },
    setPermissions(state:UserState, permissions:Array<string>) {
        state.permissions = permissions
    }
}
//定义actios
export const actions = {
    login({commit}:text<UserState,RootState>,loginParm:LoginParm){
        return new Promise<Result>((resolve,reject)=>{
            loginApi(loginParm).then(res=>{
                if(res.data.code == 200){
                    //设置到vuex中
                    commit('setToken',res.data.token)
                    commit('setUserId',res.data.id)
                    //存储到sessionStorage
                    setToken(res.data.token)
                    setUserId(res.data.id)
                    setExpireTime(res.data.expireTime)
                }
                resolve(res)
            }).catch(error=>{
                reject(error)
            })
        })
    },
    //获取用户信息
    getInfo({commit}:ActionContext<UserState,RootState>){
        return new Promise((resolve,reject) =>{
            getInfoApi().then(res =>{
                //设置权限
                commit('setPermissions',res.data.roles)
                resolve(res.data)
            }).catch((error)=>{
                reject(error)
            })
        })
    }
}
//定义getters
export const getters = {
    getToken(state:UserState){
        return state.token
    },
    getPermissions(state:UserState){
        return state.permissions
    }
}
export default{
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}