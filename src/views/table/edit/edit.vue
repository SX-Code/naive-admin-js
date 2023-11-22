<template>
  <n-card :bordered="false" class="proCard table">
    <BasicTable 
        :columns="columns" 
        :request="loadDataTable"
        @edit-end="cellEditEnd"
        @fetch-success="fetchSuccess"
        @update:checked-row-keys="onCheckedRow"
        ref="actionRef" 
        :actionColumn="actionColumn" 
        :row-key="(row) => row.id"
        :scroll-x="1000">
      <!-- 表格上方左侧的位置 -->
      <template #tableTitle>
        <n-space>
          <!-- 批量删除 -->
          <n-button strong secondary type="error" @click="removeRows">
            批量删除
          </n-button>
        </n-space>
      </template>
    </BasicTable>
  </n-card>
</template>
<script setup>
import { h, reactive, ref, unref } from 'vue'
import { BasicTable, TableAction } from '@/components/Table'
import { createListColumns, createActions } from './columns';
import { useDialog, useMessage } from 'naive-ui';

const dialog = useDialog()
const message = useMessage()
const actionRef = ref(null)
const currentIndex = ref(1)
// 选中的行
const selections = ref([]);

// 表格列属性
const columns = createListColumns({
  currentIndex() {
    return unref(currentIndex);
  },
  switchStatus: async (row) => {
    const { id, status } = row;
    const update = status === 1 ? 0 : 1;
    try {
      // 更新状态请求
      // await lockHospSet(id, update)
      console.log(`id: ${id}, updateStatus: ${update}`);
      row.status = update;
    } catch (error) {
      row.status = status
    }
  },
});

// 表格操作列属性
const currentEditKeyRef = ref('');
const actionColumn = reactive({
  width: 140,
  title: '操作',
  key: 'action',
  fixed: 'right',
  align: 'center',
  render(record) {
    return h(TableAction, {
      showLabel: false,
      actions: createActions(record, { handleSave, handleEdit, handleDelete, handleCancel }),
    });
  },
});


// 数据请求
const loadDataTable = async (res) => {
  // return await getHospSetPageList({ ...res });
  return getPageList({ ...res })
}

// 返回临时数据
const getPageList = (param) => {
  const { current, size } = param
  console.log(`current: ${current}, size: ${size}`);
  return {
		"records": [
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
		],
		"total": 0,
		"size": 5,
		"current": 1,
		"orders": [],
		"optimizeCountSql": true,
		"searchCount": true,
		"countId": null,
		"maxLimit": null,
		"pages": 0
	}
}

function fetchSuccess() {
  // 数据请求成功，设置索引
  currentIndex.value =
    (actionRef.value.pagination.current - 1) *
    actionRef.value.pagination.pageSize;
}
// 表格选中行事件
function onCheckedRow(rowKeys) {
  selections.value = rowKeys;
}

// 刷新表格
function reloadTable() {
  actionRef.value.reload();
}

// 单元格编辑提交事件
const cellEditEnd = async ({ record, index, key, value }) => {
  const param = {
    id: record.id
  }
  param[key] = value
  try {
    // 更新请求
    // await updateHospSet(param)
    console.log(param);
    message.success('保存成功')
  } catch (error) {
    console.log(error);
  }
}

// 整行编辑保存事件
const handleSave = async (record) => {
  const pass = await record.onEdit?.(false, true);
  if (pass) {
    currentEditKeyRef.value = '';
    const { id, hosname, hoscode, apiUrl, contactsName, contactsPhone } = record;
    // 提交更新
    try {
      // 更新请求
      // await updateHospSet({ id, hosname, hoscode, apiUrl, contactsName, contactsPhone })
      console.log({ id, hosname, hoscode, apiUrl, contactsName, contactsPhone });
      message.success('保存成功')
    } catch (error) {
      console.log(error);
    }
  }
}

// 开启整行编辑事件
const handleEdit = (record) => {
  currentEditKeyRef.value = record.key;
  record.onEdit?.(true);
}

// 删除事件
const handleDelete = (record) => {
  dialog.info({
    title: '提示',
    content: `您想删除：${record.hosname}`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      // 删除请求
      // await deleteHospSet(record.id)
      console.log(record.id);
      reloadTable();
    },
    onNegativeClick: () => { },
  });
}

// 批量删除事件
const removeRows = () => {
  const ids = unref(selections);
  if (ids.length === 0) {
    message.warning('请至少勾选一列');
    return;
  }
  dialog.warning({
    title: '提示',
    content: `您要删除: ${ids}`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      // 批量删除请求
      // await batchRemoveHospSet(ids);
      console.log(ids);
      reloadTable();
    },
    onNegativeClick: () => {},
  });
}

// 取消整行编辑事件
const handleCancel = (record) => {
  currentEditKeyRef.value = '';
  record.onEdit?.(false, false);
}
</script>