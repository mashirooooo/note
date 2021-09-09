import Store from '@/renderer/store';
import { windowCreate, windowMessageOn, windowShow } from '@/renderer/common/window';
import { domCreateElement } from '@/renderer/common/dom';

import styles from './scss/index.lazy.scss';

const args = Store.get<Customize>('customize');

function onTest() {
  windowMessageOn('test', (event, args) => {
    console.log(args);
  });
}

export function onLoad() {
  styles.use();
  onTest();
}

export function onReady() {
  windowShow(args.id);
}

export function onUnmounted() {
  styles.unuse();
}

export default function (): View {
  const baidu = domCreateElement('button', 'but', '打开baidu');
  const but = domCreateElement('button', 'but', '弹框');
  but.addEventListener('click', () => {
    windowCreate({
      customize: {
        title: '弹框测试',
        route: '/message',
        parentId: args.id,
        data: { text: '123' }
      },
      width: 400,
      height: 200,
      modal: true,
      resizable: true
    });
  });
  baidu.addEventListener('click', () => {
    windowCreate({
      customize: {
        url: 'https://baidu.com/',
        parentId: args.id
      },
      width: 800,
      height: 600,
      resizable: true
    });
  });
  return {
    dom: [but, baidu]
  };
}
