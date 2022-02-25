import http from "@/http/http";
import { AddDeptModel, ListParm } from "./DeptModel";
enum Api {
  getDeptList = "/api/department/list",
  getParent = "/api/department/parent",
  add = "/api/department",
  edit = "/api/department",
  delete = "/api/department",
}
//查询部门列表
export const getDeptListApi = async (parms: ListParm) => {
  return await http.get(Api.getDeptList, parms);
};
//查询上级部门树
export const getDeptParentApi = async () => {
  return await http.get(Api.getParent);
};
//新增
export const addDeptApi = async (parms: AddDeptModel) => {
  return await http.post(Api.add, parms);
};
//编辑
export const editDeptApi = async (parms: AddDeptModel) => {
  return await http.put(Api.edit, parms);
};
//删除
export const deleteDeptApi = async (parms: any) => {
  return await http.delete(Api.delete, parms);
};
