<template>
  <SysDialog
    :title="dialog.title"
    :width="dialog.width"
    :height="dialog.height"
    :visible="dialog.visible"
    @on-close="onClose"
    @on-confirm="confirm"
  >
    <template #content>
      <el-tree
        ref="parentTree"
        :data="treeData.data"
        node-key="id"
        :props="defaultProps"
        default-expand-all
        :highlight-current="true"
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
      >
        <template #default="{ node, data }">
          <div class="custom-tree-container">
            <!-- 长度为0说明没有下级 -->
            <span v-if="data.children.length == 0">
              <DocumentRemove
                style="
                  width: 1.3em;
                  height: 1.3em;
                  margin-right: 5px;
                  color: #8c8c8c;
                "
              />
            </span>
            <!-- 点击展开和关闭 -->
            <span v-else>
              <component
                :is="data.open ? Plus : Minus"
                style="
                  width: 1.1em;
                  height: 1.1em;
                  margin-right: 5px;
                  color: #8c8c8c;
                "
              />
            </span>
            <span>{{ node.label }}</span>
          </div>
        </template>
      </el-tree>
    </template>
  </SysDialog>
</template>
<script setup lang="ts">
import SysDialog from "@/components/SysDialog.vue";
import useDialog from "@/hooks/useDialog";
import useParent from "@/composables/department/useParent";
import { DocumentRemove, Plus, Minus } from "@element-plus/icons";
import { ElTree } from "element-plus";

const { dialog, onClose, onShow } = useDialog();
const { treeData, getTreeData, defaultProps, handleNodeClick, selectNode } =
  useParent();
const show = async () => {
  await getTreeData();
  dialog.width = 300;
  dialog.height = 420;
  dialog.title = "选择上级部门";
  // 展示弹窗
  onShow();
};
const emit = defineEmits(["select"]);
const confirm = () => {
  emit("select", selectNode);
  onClose();
};
defineExpose({
  show,
});
</script>
<style scoped lang="scss"></style>
