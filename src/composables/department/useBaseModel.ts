/**
 * 部门模块的校验规则
 */
import { reactive } from "vue";
import { AddDeptModel } from "@/api/dept/DeptModel";
export default function useBaseModel() {
  //表单验证
  const rules = reactive({
    parentName: [
      {
        required: true,
        message: "请选择上级部门",
        trigger: "change",
      },
    ],
    name: [
      {
        required: true,
        message: "请填写部门名称",
        trigger: "change",
      },
    ],
  });

  //表单绑定的数据
  const dialogModel = reactive<AddDeptModel>({
    type: "",
    id: "",
    pid: "",
    parentName: "",
    manager: "",
    deptAddress: "",
    deptPhone: "",
    name: "",
    deptCode: "",
    orderNum: "",
  });
  return {
    rules,
    dialogModel,
  };
}
