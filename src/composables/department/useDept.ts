import { ref } from "vue";
import { AddDeptModel, DeptModel, ListParm } from "@/api/dept/DeptModel";
import { EditType } from "@/type/BaseEnum";
import useInstance from "@/hooks/useInstance";
import { addDeptApi, editDeptApi, deleteDeptApi } from "@/api/dept/dept";
import { Result, StatusCode } from "@/http/request";

export default function useDept(getDeptList: any, searchParm: ListParm) {
  const { global } = useInstance();
  const addDeptRef = ref<{ show: (type: string) => void }>();
  //搜索
  const searchBtn = () => {
    getDeptList();
  };
  // 重置
  const resetBtn = () => {
    searchParm.searchName = "";
    getDeptList();
  };
  //新增
  const addBtn = () => {
    //!父组件调用子组件的show方法，怎么调的？？？
    addDeptRef.value?.show(EditType.ADD);
  };
  //编辑
  const editBtn = (row: DeptModel) => {
    addDeptRef.value?.show(EditType.EDIT, row);
  };
  //删除
  const deleteBtn = async (id: number) => {
    let parm = {
      id,
    };
    const confirm = await global.$myconfirm("确定删除该数据吗？");
    if (confirm) {
      let res = await deleteDeptApi(parm);
      if (res && res.code == StatusCode.Success) {
        //信息提示
        global.$message({ message: res.msg, type: "success" });
        //刷新表格
        getDeptList();
      }
    }
  };

  //保存
  const save = async (parm: AddDeptModel) => {
    //提交表单
    let res: Result;
    if (parm.type == EditType.ADD) {
      //新增
      res = await addDeptApi(parm);
    } else {
      //编辑
      res = await editDeptApi(parm);
    }
    if (res && res.code == StatusCode.Success) {
      //信息提示
      global.$message({ message: res.msg, type: "success" });
      //刷新表格
      getDeptList();
    }
  };
  return {
    searchBtn,
    addBtn,
    editBtn,
    deleteBtn,
    addDeptRef,
    save,
    resetBtn,
  };
}
