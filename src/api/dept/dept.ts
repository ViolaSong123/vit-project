import {ListParm} from './DeptModel'
import http from '@/http/http'
enum Api{
    getDeptList = '/api/department/list'
}
// export const getDeptListApi = async(params:ListParm) {
//     return await http.get(Api.getDeptList, params)
// }
//查询部门列表
export const getDeptListApi = async(parms:ListParm) =>{
    return  await http.get(Api.getDeptList,parms)
}