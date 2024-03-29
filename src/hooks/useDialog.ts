import { reactive } from "vue";
import { DialogModel } from "@/type/BaseType";
export default function useDialog() {
  //弹框属性
  const dialog = reactive<DialogModel>({
    title: "",
    visible: false,
    width: 630,
    height: 300,
  });
  //弹框取消
  const onClose = () => {
    dialog.visible = false;
  };
  //弹框确定
  const onConfirm = () => {
    dialog.visible = false;
  };
  //弹框显示
  const onShow = () => {
    dialog.visible = true;
  };
  return {
    dialog,
    onClose,
    onConfirm,
    onShow,
  };
}
//
