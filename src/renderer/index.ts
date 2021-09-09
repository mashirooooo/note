import { createApp } from 'vue';
import { windowLoad } from '@/renderer/common/window';
import { domPropertyLoad } from '@/renderer/common/dom';
import { customize } from '@/renderer/store';
import App from '@/renderer/views/index.vue';
import router from '@/renderer/router';

windowLoad((_, args) => {
  router.addRoute({
    path: '/',
    redirect: args.route
  });
  customize.set(args);
  domPropertyLoad();
  createApp(App).use(router).mount('#app');
});
