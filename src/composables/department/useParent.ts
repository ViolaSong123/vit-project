import { DeptModel, SelectNode } from "@/api/dept/DeptModel";
import { reactive, ref } from "vue";
import { getDeptParentApi } from "@/api/dept/dept";
import { ElTree } from "element-plus";
export default function useParent() {
  //树的ref属性
  const parentTree = ref<InstanceType<typeof ElTree>>();
  //上级树的数据
  const treeData = reactive({
    data: [],
  });
  //选中的数据
  const selectNode = reactive<SelectNode>({
    id: "",
    name: "",
  });
  //树的属性
  const defaultProps = reactive({
    children: "children", //设置树的children
    label: "name", //设置树的名字属性字段
  });

  //树的点击事件
  const handleNodeClick = (data: DeptModel) => {
    selectNode.id = data.id;
    selectNode.name = data.name;
  };
  //获取树的数据
  const getTreeData = async () => {
    let res = await getDeptParentApi();
    if (res && res.code == 200) {
      treeData.data = res.data;
    }
  };

  //加号和减号的点击事件
  const openBtn = (data: DeptModel) => {
    console.log(data);
    //设置展开或者关闭
    data.open = !data.open;
    if (parentTree.value) {
      parentTree.value.store.nodesMap[data.id].expanded = !data.open;
    }
  };
  return {
    treeData,
    defaultProps,
    handleNodeClick,
    getTreeData,
    openBtn,
    parentTree,
    selectNode,
  };
}
