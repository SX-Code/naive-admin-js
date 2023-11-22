export const schemas = [
  {
    field: 'hosname',
    component: 'NInput',
    label: '医院名称',
    defaultValue: '',
    labelMessge: '筛选医院名称',
    componentProps: {
      placeholder: '请输入医院名称',
    }
  },
  {
    field: 'hoscode',
    component: 'NInput',
    label: '医院编号',
    defaultValue: '',
    labelMessge: '筛选医院编号',
    componentProps: {
      placeholder: '请输入医院编号',
    }
  },
];

export const columns = [
  {
    type: 'selection',
    key: 'selection'
  },
  {
    title: '医院名称',
    key: 'hosname',
  },
  {
    title: '医院编号',
    key: 'hoscode',
  }
]