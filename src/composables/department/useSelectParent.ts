import { ref } from "vue";
export default function useSelectParent() {
  const parentRef = ref<{ show: () => void }>();

  // 点击上级部门触发的方法
  const selectParent = () => {
    parentRef.value?.show();
  };

  return {
    parentRef,
    selectParent,
  };
}
