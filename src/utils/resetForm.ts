import { objectToString } from "@vue/shared";

/**
 * 清空表单数据
 * fromRef  表单实例
 * obj 表单绑定的对象
 */
export default function resetForm(fromRef: any, obj: any) {
  // 清空表单
  Object.keys(obj).forEach((key) => {
    obj[key] = "";
  });
  // 清楚表单验证
  if (fromRef) {
    fromRef.resetFields();
    fromRef.clearValidate();
  }
}
