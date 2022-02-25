<template>
  <SysDialog
    :title="dialog.title"
    :visible="dialog.visible"
    :height="dialog.height"
    :width="dialog.width"
    @onClose="onClose"
    @onConfirm="confirm"
  >
    <template v-slot:content>
      <!-- 
          :model表单绑定的数据域
          ref: 相当于div的id，是唯一的
          :rules:表单验证规则
          el-row : 一行，分成24等分
          el-col ： 列
            -->
      <el-form
        :model="dialogModel"
        ref="addDeptForm"
        :rules="rules"
        label-width="80px"
        size="small"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item prop="parentName" label="上级部门">
              <el-input type="hidden" v-model="dialogModel.pid"></el-input>
              <el-input
                v-model="dialogModel.parentName"
                @click="selectParent"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="name" label="部门名称">
              <el-input v-model="dialogModel.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="deptCode" label="部门编码">
              <el-input v-model="dialogModel.deptCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="deptPhone" label="部门电话">
              <el-input v-model="dialogModel.deptPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="manager" label="部门经理">
              <el-input v-model="dialogModel.manager"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="deptAddress" label="部门地址">
              <el-input v-model="dialogModel.deptAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="orderNum" label="部门序号">
              <el-input v-model="dialogModel.orderNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </SysDialog>
  <parent ref="parentRef" @select="select"></parent>
</template>
<script setup lang="ts">
import SysDialog from "@/components/SysDialog.vue";
import useDialog from "@/hooks/useDialog";
import { EditType, Title } from "@/type/BaseEnum";
import useBaseModel from "@/composables/department/useBaseModel";
import { DeptModel, SelectNode } from "@/api/dept/DeptModel";
import useInstance from "@/hooks/useInstance";
import { reactive, ref } from "vue";
import { ElForm } from "element-plus";
import useSelectParent from "@/composables/department/useSelectParent";
import parent from "./parent.vue";
//全局挂载global
const { global } = useInstance();
//基础数据
const { dialogModel, rules } = useBaseModel();
//弹框
const { dialog, onClose, onShow } = useDialog();
// 定义表单的ref属性
const addDeptForm = ref<InstanceType<typeof ElForm>>();
//注册事件
const emit = defineEmits(["save"]);
//弹框确定返回表单值给父组件
const confirm = () => {
  //返回值
  emit("save", dialogModel);
  //关闭弹框
  onClose();
};

//父组件调用子组件展示弹框
const show = (type: string, row?: DeptModel) => {
  // 设置弹窗的宽高
  dialog.width = 650;
  dialog.height = 250;
  //设置弹框的标题
  type == EditType.ADD
    ? (dialog.title = Title.ADD)
    : (dialog.title = Title.EDIT);
  //显示弹框
  onShow();
  global.$resetForm(addDeptForm.value, dialogModel);
  if (EditType.EDIT === type) {
    //把要编辑的数据，放到表单绑定的model里面
    //! 直接赋值为什么不可以呢？？？
    global.$objCoppy(row, dialogModel);
    // dialogModel.value.deptAddress = row.value.deptAddress;
  }
  //设置编辑属性
  dialogModel.type = type;
};

defineExpose({
  show,
});
// 上级部门
const { parentRef, selectParent } = useSelectParent();
const select = (targetNode: SelectNode) => {
  dialogModel.pid = targetNode.id;
  dialogModel.parentName = targetNode.name;
};
</script>
<style scoped lang="scss"></style>
