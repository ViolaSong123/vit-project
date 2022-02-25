/**
 * 部门列表业务处理逻辑
 */
import { ListParm } from "@/api/dept/DeptModel";
import { getDeptListApi } from "@/api/dept/dept";
import { reactive, onMounted, ref, nextTick } from "vue";
import { read } from "fs";

export default function useDeptTable() {
  //表格的高度
  const tableHeigth = ref(0);
  // 定义搜索数据
  const searchParm = reactive<ListParm>({
    searchName: "",
  });
  // 定义表格数据
  const tableData = reactive({
    list: [],
  });
  //获取表格数据
  const getDeptList = async () => {
    const res = await getDeptListApi(searchParm);
    if (res && res.code == 200) {
      tableData.list = res.data;
    }
  };
  //首次加载数据
  onMounted(() => {
    getDeptList();
  });
  return {
    searchParm,
    tableData,
    getDeptList,
  };
}
