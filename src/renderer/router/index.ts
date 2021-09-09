import { createRouter, createWebHashHistory } from 'vue-router';
import { windowUpdate } from '@/renderer/common/window';
import { customize } from '@/renderer/store';
import pageRoute from '@/renderer/router/modular/page';
import dialogRoute from '@/renderer/router/modular/dialog';

const Router = createRouter({
  history: createWebHashHistory(),
  routes: [...pageRoute, ...dialogRoute]
});

Router.beforeEach((to, from) => {
  const customizeData = customize.get();
  if (to.path !== customizeData.route) {
    //更新窗口路由
    customizeData.route = to.path;
    customize.set(customizeData);
    windowUpdate();
  }
});

export default Router;
