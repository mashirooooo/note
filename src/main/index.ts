import App from './modular/app';
import Global from './modular/global';
import Window from './modular/window';
import Tray from './modular/tray';
import { Platforms } from './platform';
import { logOn } from './modular/log';
import { pathOn } from './modular/path';
import { fileOn } from './modular/file';

(async () => {
  await App.start();
  // 平台差异
  await Platforms[process.platform]();
  // 主要模块
  App.on();
  Global.on();
  Window.on();
  Tray.on();
  logOn();
  // 可选模块
  fileOn();
  pathOn();
  await App.uses([
    import('./modular/session'),
    import('./modular/dialog'),
    import('./modular/menu')
  ]);
  // 窗口
  Window.create();
  // 托盘
  Tray.create();
})();
