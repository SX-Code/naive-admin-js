export const schemas = [
  {
    field: 'name',
    component: 'NInput',
    label: '姓名',
    defaultValue: '',
    labelMessage: '这是一个提示',
    rules: [{required: true, trigger: ['blur']}],
    componentProps: {
      placeholder: '请输入姓名',
      onInput: (e) => {
        console.log(`NInput: ${e}`);
      },
    }
  },
  {
    field: 'phone',
    component: 'NInput',
    label: '手机',
    defaultValue: '',
    componentProps: {
      placeholder: '请输入手机号码',
    }
  },
  {
    field: 'type',
    component: 'NSelect',
    label: '类型',
    componentProps: {
      placeholder: '请选择类型',
      options: [
        { label: '舒适型', value: 'comfort' },
        { label: '经济型', value: 'economical' }
      ],
      onUpdateValue: (e) => {
        console.log(`NSelect: ${e}`);
      },
    }
  },
  {
    field: 'reserveTime',
    component: 'NDatePicker',
    label: '预约时间',
    defaultValue: 1183135260000,
    componentProps: {
      type: 'date',
      clearable: true,
      onUpdateValue: (e) => {
        console.log(`NDatePicker: ${e}`);
      },
    }
  },
  {
    field: 'stayTime',
    component: 'NTimePicker',
    label: '停留时间',
    componentProps: {
      clearable: true,
      onUpdateValue: (e) => {
        console.log(`NTimePicker: ${e}`);
      },
    }
  },
  {
    field: 'status',
    label: '状态',
    //插槽
    slot: 'statusSlot',
  },
  {
    field: 'project',
    component: 'NCheckbox',
    label: '预约项目',
    componentProps: {
      placeholder: '请选择预约项目',
        options: [
        { label: '种牙', value: '1' },
        { label: '补牙', value: '2' },
        { label: '根管', value: '3' }
      ],
      onUpdateValue: (e) => {
        console.log(`NCheckbox: ${JSON.stringify(e)}`);
      },
    }
  },
  {
    field: 'source',
    component: 'NRadioGroup',
    label: '来源',
    componentProps: {
      options: [
        { label: '网上', value: '1' },
        { label: '门店', value: '2' },
      ],
      onUpdateValue: (e) => {
        console.log(`NRadioGroup: ${JSON.stringify(e)}`);
      },
    },
  },
];