import { app, globalShortcut, ipcMain, shell } from 'electron';
import { resolve } from 'path';
import { logError } from '@/main/modular/log';
import Window from '@/main/modular/window';

export class App {
  private static instance: App;

  public modular: { [key: string]: any } = {};

  static getInstance() {
    if (!App.instance) App.instance = new App();
    return App.instance;
  }

  constructor() {}

  /**
   * 启动主进程
   */
  async start() {
    this.appOn();
    // 协议调起
    let argv = [];
    if (!app.isPackaged) argv.push(resolve(process.argv[1]));
    argv.push('--');
    if (!app.isDefaultProtocolClient(app.name, process.execPath, argv))
      app.setAsDefaultProtocolClient(app.name, process.execPath, argv);
    await app.whenReady().catch(logError);
    // darwin
    app.on('activate', () => {
      if (Window.getAll().length === 0) Window.create();
    });
  }

  /**
   * 挂在模块
   * @param mod
   */
  async use(mod: Promise<any>) {
    await mod
      .then((req) => {
        this.modular[req.default.name] = new req.default();
        this.modular[req.default.name].on();
      })
      .catch(logError);
  }

  /**
   * 挂载多个模块
   * @param mods
   */
  async uses(mods: Promise<any>[]) {
    await Promise.all(mods)
      .then((res) => {
        for (let i = 0, len = res.length; i < len; i++) {
          this.modular[res[i].default.name] = new res[i].default();
          this.modular[res[i].default.name].on();
        }
      })
      .catch(logError);
  }

  /**
   * 主进程监听
   */
  appOn() {
    // 默认单例根据自己需要改
    if (!app.requestSingleInstanceLock()) app.quit();
    else {
      app.on('second-instance', (event, argv) => {
        // 当运行第二个实例时,将会聚焦到main窗口
        if (Window.main) {
          if (Window.main.isMinimized()) Window.main.restore();
          Window.main.show();
          Window.main.focus();
        }
      });
    }
    // 渲染进程崩溃监听
    app.on('render-process-gone', (event, webContents, details) =>
      logError(
        '[render-process-gone]',
        webContents.getTitle(),
        webContents.getURL(),
        JSON.stringify(details)
      )
    );
    // 子进程崩溃监听
    app.on('child-process-gone', (event, details) =>
      logError('[child-process-gone]', JSON.stringify(details))
    );
    // 关闭所有窗口退出
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') app.quit();
    });
    // 获得焦点时发出
    app.on('browser-window-focus', () => {
      // 关闭刷新
      globalShortcut.register('CommandOrControl+R', () => {});
    });
    // 失去焦点时发出
    app.on('browser-window-blur', () => {
      // 注销关闭刷新
      globalShortcut.unregister('CommandOrControl+R');
    });
  }

  /**
   * 开启监听
   */
  on() {
    //app常用获取路径
    ipcMain.on('app-path-get', (event, args) => {
      event.returnValue = app.getPath(args.key);
    });
    //app打开外部url
    ipcMain.on('app-open-url', (event, args) => {
      shell.openExternal(args.url).then();
    });
    //app重启
    ipcMain.on('app-relaunch', (event, args) => {
      app.relaunch({ args: process.argv.slice(1) });
      if (args) app.exit(0);
    });
  }
}

export default App.getInstance();
