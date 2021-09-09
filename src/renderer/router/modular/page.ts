import { RouteRecordRaw } from 'vue-router';

const Route: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/renderer/views/pages/home/index.vue')
  }
];

export default Route;
