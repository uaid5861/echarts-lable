<template>
  <el-dialog :title="title" v-model="visible">
    <el-form :model="localUser" label-width="100px">
      <el-form-item label="姓名">
        <el-input v-model="localUser.name" :disabled="mode === 'view'"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="localUser.address" :disabled="mode === 'view'"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="localUser.state" :disabled="mode === 'view'">
          <el-option label="已发布" value="published"></el-option>
          <el-option label="草稿" value="draft"></el-option>
          <el-option label="已删除" value="deleted"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="saveUser" v-if="mode === 'edit'">保存</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  visible: Boolean,
  user: {
    type: Object,
    default: () => ({})
  },
  mode: {
    type: String,
    default: 'view'
  }
});

const emits = defineEmits(['update:visible', 'save']);

const title = ref('');
const localUser = reactive({ ...props.user });

watch(() => props.user, (newUser) => {
  Object.assign(localUser, newUser);
});

watch(() => props.mode, (newMode) => {
  title.value = newMode === 'view' ? '查看用户信息' : '编辑用户信息';
});

const saveUser = () => {
  emits('save', { ...localUser });
  emits('update:visible', false);
};

watch(() => props.visible, (newVal) => {
  if (!newVal) {
    Object.assign(localUser, props.user);
  }
});
</script>
