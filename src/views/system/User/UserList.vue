<template>
    <el-container :style="{ height: containerHeight + 'px' }">
        <el-aside width="210px" style="border-right: 1px solid #dfe6ec">
            <!-- Aside content 左侧部门-->
            <LeftTree @treeClick="treeClick"></LeftTree>
        </el-aside>
        <el-main>
            <!-- 搜索栏-->
            <el-form :model="listParm" label-width="80px" :inline="true" size="mini">
                <el-form-item>
                    <el-input placeholder="请输入用户姓名" v-model="listParm.loginName"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button :icon="Search" @click="searchBtn">搜索</el-button>
                    <el-button :icon="Close" style="color: #FF7670;" @click="resetBtn">重置</el-button>
                    <el-button :icon="Plus" v-permission="['sys:user:add']" type="primary" @click="addBtn">新增</el-button>
                </el-form-item>
            </el-form>
            <!-- 用户列表 -->
            <el-table :height="tableHeigth" :data="tableData.list" border stripe>
                <el-table-column prop="loginName" label="姓名" />
                <el-table-column prop="deptName" label="所属部门" />
                <el-table-column prop="mobile" label="电话" />
                <el-table-column prop="email" label="邮箱" />
                <el-table-column label="操作" width="310" align="center">
                    <template #default="scope">
                        <el-button size="mini" type="primary" v-permission="['sys:user:edit']" :icon="Edit" @click="editBtn(scope.row)">编辑</el-button>
                        <el-button size="mini" type="primary" v-permission="['sys:user:assign']" :icon="Setting" @click="assignBtn(scope.row)">分配角色</el-button>
                        <el-button size="mini" type="danger" v-permission="['sys:user:delete']" :icon="Delete" @click="deleteBtn(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 
            
            size-change:
            -->
            <el-pagination
                @size-change="sizeChange"
                @current-change="currentChange"
                :current-page.sync="listParm.currentPage"
                :page-sizes="[10, 20, 40, 80, 100]"
                :page-size="listParm.pageSize"
                :total="listParm.total"
                layout="total, sizes, prev, pager, next, jumper"
                background
            ></el-pagination>
        </el-main>
    </el-container>
    <!-- 新增、编辑弹框 -->
    <AddAndEdit ref="userAddRef" @save='save'></AddAndEdit>
    <!-- 分配角色弹框 -->
    <AssignRole ref='assignRoleRef'></AssignRole>
</template>
<script setup lang="ts">
import AddAndEdit from './AddAndEdit.vue';
import AssignRole from './AssignRole.vue';
import { Search, Plus, Close, Edit, Delete, Setting } from '@element-plus/icons';
import { ref, onMounted, nextTick } from 'vue'
import LeftTree from './LeftTree.vue';
import useUserTable from '@/composables/user/useUserTable';
import useUser from '@/composables/user/useUser';
//容器的高度
const containerHeight = ref(0);

//表格的高度
const tableHeigth = ref(0);

//表格列表
const { listParm, getUserList, tableData, treeClick, sizeChange, currentChange,searchBtn,resetBtn } = useUserTable();

//表格的增删改查
const {addBtn,editBtn,deleteBtn,assignBtn,userAddRef,save,assignRoleRef} = useUser(getUserList)


onMounted(() => {
    //注意：需要放到nextTick
    nextTick(() => {
        containerHeight.value = window.innerHeight - 100
        tableHeigth.value = window.innerHeight - 220
    })
})
</script>