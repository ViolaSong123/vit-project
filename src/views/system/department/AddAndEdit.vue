<template>
    <SysDialog
        :title="dialog.title"
        :visible="dialog.visible"
        :width="dialog.width"
        :height="dialog.height"
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
                            <el-input @click="selectParent" v-model="dialogModel.parentName"></el-input>
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
    <!-- 上级部门弹框 -->
    <parent ref="parentRef" @select="select"></parent>
</template>
<script setup lang='ts'>
import { ref, reactive } from 'vue'
import parent from './parent.vue';
import SysDialog from '@/components/SysDialog.vue';
import useDialog from '@/hooks/useDialog';
import useBaseModel from '@/composables/department/useBaseModel';
import { EditType, Title } from '@/type/BaseEnum';
import useSelectParent from '@/composables/department/useSelectParent';
import { DeptModel, SelectNode } from '@/api/dept/DeptModel';
import { ElForm } from 'element-plus';
import useInstance from '@/hooks/useInstance';
//全局挂载global
const { global } = useInstance();

//基础数据
const { dialogModel, rules } = useBaseModel();

//弹框属性
const { dialog, onShow, onClose } = useDialog();

//表单的ref属性
const addDeptForm = ref<InstanceType<typeof ElForm>>();

//定义事件
const emit = defineEmits(['save'])

//弹框的确定,把表单的值，返回给父组件
const confirm = () => {
    addDeptForm.value?.validate(valid => {
        //验证通过，才提交表单
        if (valid) {
            emit('save', dialogModel)
            onClose();
        }
    })
}

//显示弹框
const show = (type: string, row?: DeptModel) => {
    //设置弹框的宽度
    dialog.width = 650;
    dialog.height = 250;
    //设置弹框的标题
    type == EditType.ADD ? dialog.title = Title.ADD : dialog.title = Title.EDIT
    //显示
    onShow();
    //清空表单
    global.$resetForm(addDeptForm.value, dialogModel);
    if (EditType.EDIT === type) {
        //把要编辑的数据，放到表单绑定的model里面
        global.$objCoppy(row, dialogModel)
    }
    //设置编辑属性
    dialogModel.type = type;
}

//在组件中，属性和方法，只能对当前template,
//外部需要使用的时候，需要使用 defineExpose 暴露出去
//给父组件
defineExpose({
    show
})

//上级部门
const { parentRef, selectParent } = useSelectParent();

//选中上级的数据
const select = (node: SelectNode) => {
    console.log('父组件取到值')
    console.log(node)
    dialogModel.pid = node.id;
    dialogModel.parentName = node.name
}
</script>
<style scoped lang='scss'>
</style>