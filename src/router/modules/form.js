const routeName = 'form';
import { Layout } from '@/router/constant';
import { GroupOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

const routes = [
  {
    path: '/form',
    name: routeName,
    redirect: '/table/basic',
    component: Layout,
    meta: {
      title: 'BasicForm表单',
      icon: renderIcon(GroupOutlined),
      sort: 2,
    },
    children: [
      {
        path: 'basic',
        name: `${routeName}_basic`,
        meta: {
          title: '基础表单'
        },
        component: () => import('@/views/form/basic/basic.vue'),
      },
      {
        path: 'combin',
        name: `${routeName}_combin`,
        meta: {
          title: '表单表格',
          keepAlive: true,
        },
        component: () => import('@/views/form/combin/combin.vue'),
      },
    ],
  },
];

export default routes;