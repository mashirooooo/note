const Router: Route[] = [
  {
    path: '/home',
    name: 'Index',
    component: () => import('@/renderer/views/pages/home/index')
  }
];

export default Router;
