<template>
  <div class="crudcon">
    <button class="addbtn" @click="addUser">添加</button>
    <el-table :data="tableData" v-loading="loading" style="width: 100%; margin-top: 20px" max-height="400"
      :default-sort="{ prop: 'id', order: 'descending' }">
      <el-table-column prop="avatar" label="头像" width="130">
        <template #default="scope">
          <img :src="scope.row.avatar" style="width: 40px;height: 40px;border-radius: 12px;" />
        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID" width="180" sortable />
      <el-table-column prop="name" label="作者" width="180" />
      <el-table-column prop="date" label="截稿日期" width="180" />
      <el-table-column prop="address" label="地址" width="280" />
      <el-table-column prop="state" label="状态" width="180">
        <template #default="scope">
          <el-tag v-if="scope.row.state === 'published'" type="success">已发布</el-tag>
          <el-tag v-else-if="scope.row.state === 'draft'" type="info">草稿</el-tag>
          <el-tag v-else-if="scope.row.state === 'deleted'" type="warning">已删除</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="bili" label="分成比例" width="180" />
      <el-table-column label="操作" width="180" fixed="right">
        <template #default="scope">
          <el-button type="text" size="small" @click="openDialog(scope.row, 'view')">查看</el-button>
          <el-button type="text" size="small" @click="openDialog(scope.row, 'edit')">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" v-model="dialogVisible">
      <el-form :model="currentUser" label-width="100px">
        <el-form-item label="姓名">
          <el-input v-model="currentUser.name" :disabled="dialogMode === 'view'"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="currentUser.address" :disabled="dialogMode === 'view'"></el-input>
        </el-form-item>
        <el-form-item label="调整分成比例">
          <el-select v-model="currentUser.bili" placeholder="Select" :disabled="dialogMode === 'view'"style="width: 240px">
            <el-option v-for="item in bilioptions" :key="item.value" :label="item.label" :value="item.value"
              :disabled="item.disabled" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="currentUser.state" :disabled="dialogMode === 'view'" style="width: 240px">
            <el-option label="已发布" value="published"></el-option>
            <el-option label="草稿" value="draft"></el-option>
            <el-option label="已删除" value="deleted"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>

        <el-button type="primary" @click="saveUser"
          v-if="dialogMode !== 'view' && currentUser.name !== ''">保存</el-button>
        <el-button type="primary" @click="saveUser" v-else="dialogMode !== 'view'" disabled>保存</el-button>
      </template>
    </el-dialog>
  </div>
  <h1 style="margin-top: 40px;font-weight: 600; font-size: 24px;display: flex; justify-content: center;">不知道写什么先空着</h1>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue';


const loading = ref(true);

const tableData = reactive([
  { avatar: 'https://ibb.co/yFGHcrz', id: '12987122', date: '2016-05-03', name: 'Tom1', address: 'No. 189, Grove St, Los Angeles', state: 'published', bili: '30%' },
  { avatar: 'https://ibb.co/7QZz6HK', id: '12987123', date: '2016-05-02', name: 'Tom2', address: 'No. 189, Grove St, Los Angeles', state: 'draft', bili: '30%' },
  { avatar: 'https://ibb.co/N7RqRv3', id: '12987124', date: '2016-05-04', name: 'Tom3', address: 'No. 189, Grove St, Los Angeles', state: 'deleted', bili: '30%' },
  { avatar: 'https://ibb.co/BnwvBVJ', id: '12987125', date: '2016-05-01', name: 'Tom4', address: 'No. 189, Grove St, Los Angeles', state: 'published', bili: '30%' },
  { avatar: 'https://ibb.co/BnwvBVJ', id: '12987126', date: '2016-05-01', name: 'Tom4', address: 'No. 189, Grove St, Los Angeles', state: 'published', bili: '30%' },
  { avatar: 'https://ibb.co/BnwvBVJ', id: '12987127', date: '2016-05-01', name: 'Tom4', address: 'No. 189, Grove St, Los Angeles', state: 'published', bili: '30%' },
  { avatar: 'https://ibb.co/BnwvBVJ', id: '12987128', date: '2016-05-01', name: 'Tom4', address: 'No. 189, Grove St, Los Angeles', state: 'published', bili: '30%' },
  { avatar: 'https://ibb.co/BnwvBVJ', id: '12987129', date: '2016-05-01', name: 'Tom4', address: 'No. 189, Grove St, Los Angeles', state: 'published', bili: '30%' },
]);

const dialogVisible = ref(false);
const dialogTitle = ref('');
const dialogMode = ref('');
const currentUser = reactive({ avatar: '', id: '', date: '', name: '', address: '', state: '', bili: '' });

const openDialog = (user, mode) => {
  Object.assign(currentUser, user);
  dialogMode.value = mode;
  dialogTitle.value = mode === 'view' ? '查看用户信息' : '编辑用户信息';
  dialogVisible.value = true;
};

const addUser = () => {
  Object.assign(currentUser, { avatar: '', id: Date.now().toString(), date: new Date().toISOString().split('T')[0], name: '', address: '', state: 'draft' });
  dialogMode.value = 'add';
  dialogTitle.value = '添加用户';
  dialogVisible.value = true;
};

const saveUser = () => {
  if (dialogMode.value === 'edit') {
    const index = tableData.findIndex(user => user.id === currentUser.id);
    if (index !== -1) {
      tableData[index] = { ...currentUser };
    }
  } else if (dialogMode.value === 'add') {
    tableData.push({ ...currentUser });
  }
  dialogVisible.value = false;
};

watch(() => tableData.length, (newVal) => {
  loading.value = newVal === 0;
}, { immediate: true });

// const value = ref('')
const bilioptions = [
  {
    value: '10%',
    label: '10%',
  },
  {
    value: '20%',
    label: '20%',
  },
  {
    value: '30%',
    label: '30%',
  },
  {
    value: '40%',
    label: '40%',
  },
  {
    value: '50%',
    label: '50%',
    disabled: true, 
  },
]
</script>

<style lang="scss" scoped>
.crudcon {
  .addbtn {
    width: 100px;
    height: 40px;
    background-color: #5d5fef;
    color: #fff;
    font-weight: 600;
    font-size: 16px;
    border: none;
    border-radius: 12px;
    transition: all 0.3s;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }

  .addbtn:hover {
    background-color: #4d4fef;
  }

  .addbtn:active {
    transform: scale(0.95);
  }
}
</style>