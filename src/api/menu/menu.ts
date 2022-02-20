import http from "@/http/http"
enum Api {
    getMenuList = '/api/sysUser/getMenuList'
}
export const getMenuListApi = async ()=>{
    return await http.get(Api.getMenuList)
}