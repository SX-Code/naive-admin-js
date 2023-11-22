<template>
  <n-card :bordered="false" class="proCard table">
    <BasicForm @register="register" @submit="handleSubmit" @reset="handleReset" />
    <BasicTable 
        :columns="columns"
        :request="loadDataTable"
        ref="actionRef"
        :row-key="(row) => row.id"
        :scroll-x="1000" />
  </n-card>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { BasicForm, useForm } from '@/components/Form'
import { BasicTable } from '@/components/Table'
import { schemas, columns } from './columns';

// 分页参数
const defalutParams = () => {
  return {
    hosname: null,
    hoscode: null,
  };
};
const params = reactive(defalutParams())
const actionRef = ref(null)

// 注册表单
const [register, { setProps }] = useForm({
  gridProps: { cols: 3 },
  showAdvancedButton: false,
  schemas,
});

// 数据请求
const loadDataTable = async (res) => {
  return getPageList({ ...res, ...params });
}

// 返回临时数据
const getPageList = (param) => {
  const { current, size, hosname, hoscode } = param
  console.log(`current: ${current}, size: ${size}, hosname: ${hosname}, hoscode: ${hoscode}`);
  let records = [
    {
      "id": 2,
      "createTime": "2023-11-09T12:03:42.000+00:00",
      "updateTime": "2023-11-21T10:46:28.000+00:00",
      "isDeleted": 0,
      "hosname": "北京协和医院",
      "hoscode": "1000_0",
      "apiUrl": "http://localhost:9998",
      "signKey": "674c413678tiuglvfdsfy",
      "contactsName": "李医生",
      "contactsPhone": "15523341829",
      "status": 0
    },
    {
      "id": 3,
      "createTime": "2023-11-21T08:27:57.000+00:00",
      "updateTime": "2023-11-21T08:29:21.000+00:00",
      "isDeleted": 0,
      "hosname": "武汉妇幼保健医院",
      "hoscode": "2000_2",
      "apiUrl": "http://localhost:9988",
      "signKey": "674c413678tiuglvfdsfy",
      "contactsName": "王医生",
      "contactsPhone": "15562387521",
      "status": 1
    },
    {
      "id": 4,
      "createTime": "2023-11-21T09:05:33.000+00:00",
      "updateTime": "2023-11-21T10:20:57.000+00:00",
      "isDeleted": 0,
      "hosname": "息县第二人民医院",
      "hoscode": "3000_1",
      "apiUrl": "http://localhost:9901",
      "signKey": "e5a452cab6b15f988362318f2592fe41",
      "contactsName": "宋医生",
      "contactsPhone": "16432789671",
      "status": 0
    }
  ]
  // 过滤
  if (!!hosname) {
    records = records.filter((record) => record['hosname'].indexOf(hosname) != -1)
  }
  if (!!hoscode) {
    records = records.filter((record) => record['hoscode'].indexOf(hoscode) != -1)
  }
  return {
		"records": records,
		"total": 0,
		"size": size,
		"current": current,
		"orders": [],
		"optimizeCountSql": true,
		"searchCount": true,
		"countId": null,
		"maxLimit": null,
		"pages": 0
	}
}

// 刷新表格
function reloadTable() {
  actionRef.value.reload();
}

// 查询提交方法
function handleSubmit(values) {
  Object.assign(params, values);
  reloadTable();
}

// 查询重置方法
function handleReset() {
  Object.assign(params, defalutParams());
  reloadTable();
}
</script>