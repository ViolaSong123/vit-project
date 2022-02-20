import { getCurrentInstance } from 'vue'
import { LoginParm } from "@/api/user/UserModel";
import { constants } from "http2";
import { useStore } from '@/store';
import { useRouter } from 'vue-router';

export default function useLogin(loginModel:LoginParm) {
    const store = useStore();
    const router = useRouter();
    const { proxy } = getCurrentInstance() as any;
    //登录提交
    const login = () => {
        proxy.$refs.loginFormRef.validate(async (valid: boolean) => {
            if (valid) {
                console.log(valid)
                store.dispatch('user/login',loginModel).then(res =>{
                    if(res.data.code == 200){
                        //跳转首页
                        router.push({path:'/'})
                    }
                })
            }
        })
    }
    return {
        login
    }
}