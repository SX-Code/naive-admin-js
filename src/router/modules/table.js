const routeName = 'table';
import { Layout } from '@/router/constant';
import { TableOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

const routes = [
  {
    path: '/table',
    name: routeName,
    redirect: '/table/basic',
    component: Layout,
    meta: {
      title: 'BasicTable表格',
      icon: renderIcon(TableOutlined),
      sort: 1,
    },
    children: [
      {
        path: 'basic',
        name: `${routeName}_basic`,
        meta: {
          title: '基础表格'
        },
        component: () => import('@/views/table/basic/basic.vue'),
      },
      {
        path: 'edit',
        name: `${routeName}_edit`,
        meta: {
          title: '可编辑表格',
          keepAlive: true,
        },
        component: () => import('@/views/table/edit/edit.vue'),
      },
    ],
  },
];

export default routes;