import { NSwitch } from "naive-ui";
import { h } from "vue";
import { DeleteOutlined, EditOutlined } from '@vicons/antd'

export const createListColumns = ({ currentIndex, switchStatus }) => {
  return [
    {
      type: 'selection',
      key: 'selection'
    },
    {
      title: '序号',
      key: 'index',
      width: 60,
      render: (...[, record]) => {
        return currentIndex() + record + 1;
      },
    },
    {
      title: '医院名称',
      key: 'hosname',
    },
    {
      title: '医院编号',
      key: 'hoscode',
    },
    {
      title: 'api基础路径',
      key: 'apiUrl',
      width: 200,
    },
    {
      title: '联系人姓名',
      key: 'contactsName',
    },
    {
      title: '联系人手机',
      key: 'contactsPhone',
    },
    {
      title: '状态',
      key: 'status',
      render(row) {
        return h(NSwitch, {
          value: row.status === 1 ? true : false,
          onClick: () => switchStatus(row),
        });
      },
    },
  ]
}

export function createActions(record, {handleEdit, handleDelete}) {
    return [
      {
        label: '删除',
        type: 'error',
        // 配置color会覆盖type
        color: 'red',
        icon: DeleteOutlined,
        onClick: handleDelete.bind(null, record)
      },
      {
        label: '编辑',
        type: 'primary',
        icon: EditOutlined,
        onClick: handleEdit.bind(null, record)
      }
    ];
}