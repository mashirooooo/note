/**
 * 发送ipc消息
 * @param key
 * @param value
 */
export function ipcSend(key: string, value?: unknown) {
  window.ipc.send(key, value);
}

/**
 * 日志(info)
 * @param args
 */
export function logInfo(...args: any): void {
  window.ipc.send('log-info', args);
}

/**
 * 日志(error)
 * @param args
 */
export function logError(...args: any): void {
  window.ipc.send('log-error', args);
}

/**
 * 设置全局参数
 * @param key 键
 * @param value 值
 */
export function sendGlobal(key: string, value: unknown) {
  return window.ipc.sendSync('global-sharedObject-set', {
    key,
    value
  });
}

/**
 * 获取全局参数
 * @param key 键
 */
export function getGlobal<T>(key: string): T {
  return window.ipc.sendSync('global-sharedObject-get', key);
}

/**
 * 获取内部依赖文件路径(！文件必须都存放在lib/inside 针对打包后内部依赖文件路径问题)
 * @param path lib/inside为起点的相对路径
 * */
export function getInsidePath(path: string): string {
  return window.ipc.sendSync('global-insidePath-get', path);
}

/**
 * 获取外部依赖文件路径(！文件必须都存放在lib/extern下 针对打包后外部依赖文件路径问题)
 * @param path lib/extern为起点的相对路径
 * */
export function getExternPath(path: string): string {
  return window.ipc.sendSync('global-externPath-get', path);
}

/**
 * app重启
 * @param once 是否立即重启
 */
export function relaunch(once: boolean): void {
  return window.ipc.send('app-relaunch', once);
}

/**
 * app常用获取路径
 */
export function getAppPath(key: string): string {
  return window.ipc.sendSync('app-path-get', { key });
}

/**
 * app打开url
 */
export function openUrl(url: string): void {
  window.ipc.send('app-open-url', { url });
}
