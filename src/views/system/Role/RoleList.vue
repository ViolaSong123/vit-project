<template>
    <el-main>
        <!-- 搜索栏 -->
        <el-form :model="listParm" label-width="80px" :inline="true" size="mini">
            <el-form-item>
                <el-input placeholder="请输入角色名称" v-model="listParm.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button :icon="Search" @click="searchBtn">搜索</el-button>
                <el-button style="color: #FF7670;" :icon="Close" @click="resetBtn">重置</el-button>
                <el-button
                    v-permission="['sys:role:add']"
                    type="primary"
                    :icon="Plus"
                    @click="addBtn"
                >新增</el-button>
            </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table :height="tableHeight" :data="roleTable.list" border stripe>
            <el-table-column prop="name" label="角色名称"></el-table-column>
            <el-table-column prop="remark" label="角色备注"></el-table-column>
            <el-table-column label="操作" align="center" width="300">
                <template #default="scope">
                    <el-button
                        type="primary"
                        size="mini"
                        :icon="Edit"
                        v-permission="['sys:role:edit']"
                        @click="editBtn(scope.row)"
                    >编辑</el-button>
                    <el-button
                        type="primary"
                        size="mini"
                        :icon="Setting"
                        v-permission="['sys:role:assign']"
                        @click="assignPermission(scope.row.id, scope.row.name)"
                    >分配权限</el-button>
                    <el-button
                        type="danger"
                        size="mini"
                        :icon="Delete"
                        v-permission="['sys:role:delete']"
                        @click="deleteBtn(scope.row.id)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
            @size-change="sizeChange"
            @current-change="currentChange"
            :current-page.sync="listParm.currentPage"
            :page-sizes="[10, 20, 40, 80, 100]"
            :page-size="listParm.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="listParm.total"
            background
        ></el-pagination>
    </el-main>
    <!-- 新增、编辑弹框 -->
    <AddRole ref="addRoleRef" @save="save"></AddRole>
    <!-- 分配权限弹框 -->
    <AssignMenu ref="assignMenuRef"></AssignMenu>
</template>
<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { Search, Edit, Plus, Setting, Close, Delete } from '@element-plus/icons';
import useRoleTable from '@/composables/role/useRoleTable';
import useRole from '@/composables/role/useRole';
import AddRole from './AddRole.vue';
import AssignMenu from './AssignMenu.vue';
//表格的高度
const tableHeight = ref(0);
//表格列表
const { listParm, roleTable, getRoleList, sizeChange, currentChange, searchBtn, resetBtn } = useRoleTable()

//新增、编辑
const { addBtn, editBtn, deleteBtn, assignPermission, save, addRoleRef, assignMenuRef } = useRole(getRoleList)
onMounted(() => {
    nextTick(() => {
        tableHeight.value = window.innerHeight - 220
    })
})
</script>