import { NSwitch } from "naive-ui";
import { h } from "vue";
import { DeleteOutlined, EditOutlined, SaveOutlined, CloseSquareOutlined } from '@vicons/antd'

const reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/

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
      edit: true,
      editRule: true,
      editComponent: 'NInput',
    },
    {
      title: '医院编号',
      key: 'hoscode',
      edit: true,
      editRule: true,
      editComponent: 'NInput',
    },
    {
      title: 'api基础路径',
      key: 'apiUrl',
      width: 200,
      edit: true,
      editRule: true,
      editComponent: 'NInput',
    },
    {
      title: '联系人姓名',
      key: 'contactsName',
      edit: true,
      editRule: true,
      editComponent: 'NInput',
    },
    {
      title: '联系人手机',
      key: 'contactsPhone',
      edit: true,
      editRule: (text, _) => { if (!reg_tel.test(text)) return '手机号格式错误' },
      editComponent: 'NInput',
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

export function createActions(record, {handleSave, handleEdit, handleDelete, handleCancel}) {
  if (!record.editable) {
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
  } else {
    return [
      {
        label: '保存',
        type: 'success',
        icon: SaveOutlined,
        onClick: handleSave.bind(null, record),
      },
      {
        label: '取消',
        type: 'warning',
        icon: CloseSquareOutlined,
        onClick: handleCancel.bind(null, record),
      },
    ];
  }
}