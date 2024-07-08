<template>
    <div class="crudcon">
        <button class="addbtn">添加</button>
        <el-table :data="tableData" v-loading="loading" style="width: 100%; margin-top: 20px" height="500"  :default-sort="{ prop: 'id', order: 'descending' }">
            <el-table-column prop="avatar" label="头像" width="130" >
                <template #default="scope">
                    <img :src="scope.row.avatar" style="width: 40px;height: 40px;border-radius: 12px;" />
                </template>
            </el-table-column>
            <el-table-column prop="id" label="ID" width="180" sortable />
            <el-table-column prop="name" label="姓名" width="180" />
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址" width="280" />
            <el-table-column prop="state" label="状态" width="180" />
            <el-table-column prop="state" label="趋势" width="180" />
            <el-table-column label="操作" width="180" >
                <template #default="scope">
                    <el-button type="text" size="small"  @click="showUserInfo(scope)">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script lang="ts" setup>
import { ref, reactive,watch } from 'vue'
const loading = ref(true)

const tableData = reactive([
{   
    avatar: 'https://ibb.co/yFGHcrz',
    id: '12987122',
    date: '2016-05-03',
    name: 'Tom1',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    avatar: 'https://ibb.co/7QZz6HK',
    id: '12987123',
    date: '2016-05-02',
    name: 'Tom2',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    avatar: 'https://ibb.co/N7RqRv3',
    id: '12987124',
    date: '2016-05-04',
    name: 'Tom3',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    avatar: 'https://ibb.co/BnwvBVJ',
    id: '12987125',
    date: '2016-05-01',
    name: 'Tom4',
    address: 'No. 189, Grove St, Los Angeles',
  },
])

const showUserInfo = (scope) => {
    console.log('用户信息:', scope.row);
}



watch(() => tableData.length, (newVal) => {
    loading.value = newVal === 0
}, { immediate: true }) 
</script>

<style lang="scss" scoped>
.crudcon {
    .addbtn{
        width: 100px;
        height: 40px;
        background-color: #5d5fef;
        color:#fff;
        font-weight: 600;
        font-size: 16px;
        border: none;
        border-radius: 12px;
        transition: all 0.3s;
        font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
    .addbtn:hover{
        background-color: #4d4fef;
    }
    .addbtn:active{
        transform: scale(0.95);
    }
}
</style>