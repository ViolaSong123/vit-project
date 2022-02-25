<template>
  <el-main>
    <!-- 搜索栏 -->
    <el-form :model="searchParm" label-width="80px" :inline="true" size="small">
      <el-form-item>
        <el-input v-model="searchParm.searchName" />
      </el-form-item>
      <el-form-item>
        <el-button :icon="Search" size="small" @click="searchBtn">
          搜索
        </el-button>
        <el-button
          style="color: #ff7670"
          :icon="Close"
          size="small"
          @click="resetBtn"
        >
          重置
        </el-button>
        <el-button :icon="Plus" size="small" type="primary" @click="addBtn">
          新增
        </el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table
      :data="tableData.list"
      style="width: 100%"
      row-key="id"
      default-expand-all
      size="medium"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="部门名称" />
      <el-table-column prop="deptCode" label="部门编码" />
      <el-table-column prop="deptPhone" label="部门电话" />
      <el-table-column width="200" align="center" label="操作">
        <template #default="{ row }">
          <el-button
            size="small"
            type="success"
            :icon="Edit"
            @click="editBtn(row)"
          >
            编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            :icon="Close"
            @click="deleteBtn(row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
  <!-- 新增、编辑弹窗 -->
  <AddAndEdit ref="addDeptRef" @save="save" />
</template>
<script setup lang="ts">
import { Edit, Close, Plus, Search } from "@element-plus/icons";
import useDeptTable from "@/composables/department/useDeptTable";
import useDept from "@/composables/department/useDept";
import AddAndEdit from "./AddAndEdit.vue";

// 表格列表
const { searchParm, tableData, getDeptList } = useDeptTable();
// 表格操作 增、删、改、查
const { searchBtn, addBtn, editBtn, deleteBtn, addDeptRef, save, resetBtn } =
  useDept(getDeptList, searchParm);
</script>
