<template>
  <el-main>
    <!-- 搜索栏 -->
    <el-form
      :model="searchParm"
      :rules="rules"
      label-width="80px"
      :inline="true"
      size="small"
    >
      <el-form-item>
        <el-input
          v-model="searchParm.searchName"
          placeholder="请输入部门名称"
        />
      </el-form-item>
      <el-form-item>
        <el-button :icon="Search">
          查询
        </el-button>
        <!-- <el-button type="primary" :icon='Plus'>新增</el-button> -->
        <el-button
          size="mini"
          type="primary"
          :icon="Plus"
        >
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
      <el-table-column
        prop="name"
        label="部门名称"
      />
      <el-table-column
        prop="deptCode"
        label="部门编码"
      />
      <el-table-column
        prop="deptPhone"
        label="部门电话"
      />
      <el-table-column
        width="200"
        align="center"
        label="操作"
      >
        <template #default="scope">
          <el-button
            size="mini"
            type="success"
            :icon="Edit"
          >
            编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            :icon="Close"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>
<script setup lang="ts">
import {Edit,Close,Plus,Search} from '@element-plus/icons'
import useBaseModel from '@/composables/department/useBaseModel';
import useDeptTable from '@/composables/department/useDeptTable';
//基础数据
const { rules } = useBaseModel();

//表格列表
const { searchParm, tableData, getDeptList } = useDeptTable();
</script>