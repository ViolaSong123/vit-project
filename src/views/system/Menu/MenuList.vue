<template>
    <el-main>
        <!-- 按钮 -->
        <el-form :inline="true" size="mini">
            <el-form-item>
                <el-button
                    type="primary"
                    v-permission="['sys:menu:add']"
                    @click="addBtn"
                    :icon="Plus"
                >新增</el-button>
            </el-form-item>
        </el-form>

        <!-- 表格 -->
        <el-table
            :height="tableHeight"
            :data="menuTable.list"
            style="width: 100%"
            row-key="id"
            border
            default-expand-all
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
            <el-table-column prop="label" label="菜单名称" />
            <el-table-column prop="name" label="类型">
                <template #default="scope">
                    <el-tag v-if="scope.row.type == '0'">目录</el-tag>
                    <el-tag type="success" v-if="scope.row.type == '1'">菜单</el-tag>
                    <el-tag type="danger" v-if="scope.row.type == '2'">按钮</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="图标">
                <template #default="scope">
                    <Icon class="icons" :icon="scope.row.icon"></Icon>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="路由名称" />
            <el-table-column prop="path" label="路由地址" />
            <el-table-column prop="url" label="组件路径" />
            <el-table-column prop="code" label="权限字段" />
            <el-table-column label="操作" align="center" width="200">
                <template #default="scope">
                    <el-button
                        v-permission="['sys:menu:edit']"
                        type="primary"
                        size="mini"
                        @click="editBtn(scope.row)"
                        :icon="Edit"
                    >编辑</el-button>
                    <el-button
                        v-permission="['sys:menu:delete']"
                        type="danger"
                        size="mini"
                        @click="deleteBtn(scope.row.id)"
                        :icon="Delete"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-main>
    <!-- 新增、编辑弹框 -->
    <AddMenu ref="addMenuRef" @save="save"></AddMenu>
</template>
<script setup lang="ts">
import AddMenu from './AddMenu.vue';
import { ref, onMounted, nextTick } from 'vue';
import { Edit, Delete, Plus } from '@element-plus/icons';
import useMenuTable from '@/composables/menu/useMenuTable';
import useMenu from '@/composables/menu/useMenu';
//表格高度
const tableHeight = ref(0);
//表格数据获取
const { menuTable, getMenuTable } = useMenuTable()

//表格的操作
const { addBtn, editBtn, deleteBtn, save, addMenuRef } = useMenu(getMenuTable)

onMounted(() => {
    nextTick(() => {
        tableHeight.value = window.innerHeight - 200
    })
})
</script>
<style lang="scss" scoped>
.icons {
    width: 24px;
    height: 18px;
    margin-right: 5px;
}
</style>