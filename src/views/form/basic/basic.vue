<template>
  <n-card :bordered="false" class="proCard table">
    <BasicForm @register="register" @submit="handleSubmit" @reset="handleReset">
      <template #statusSlot="{ model, field }">
        <n-input v-model:value="model[field]" />
      </template>
    </BasicForm>
  </n-card>
</template>
<script setup>
import { reactive, ref, unref } from 'vue'
import { BasicForm, useForm } from '@/components/Form'
import { schemas } from './items';

// 分页参数
let params = reactive({})

// 注册表单
const [register, { setProps }] = useForm({
  gridProps: { cols: 3 },
  showAdvancedButton: true,
  labelWidth: 100,
  schemas,
});


// 刷新表格
function reloadData() {
  console.log(unref(params));
}

// 查询提交方法
function handleSubmit(values) {
  Object.assign(params, values);
  reloadData();
}

// 查询重置方法
function handleReset(values) {
  params = values
  reloadData();
}
</script>