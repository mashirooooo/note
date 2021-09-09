import { IpcRendererEvent, BrowserWindowConstructorOptions } from 'electron';
import { customize } from '@/renderer/store';

/**
 * 窗口初始化 (i)
 * */
export function windowLoad(listener: (event: IpcRendererEvent, args: Customize) => void) {
  window.ipc.once('window-load', listener);
}

/**
 * 窗口数据更新
 */
export function windowUpdate() {
  window.ipc.send('window-update', customize.get());
}

/**
 * 窗口聚焦失焦监听
 */
export function windowBlurFocus(listener: (event: IpcRendererEvent, args: any) => void) {
  window.ipc.on('window-blur-focus', listener);
}

/**
 * 关闭窗口聚焦失焦监听
 */
export function windowBlurFocusRemove() {
  window.ipc.removeAllListeners('window-blur-focus');
}

/**
 * 窗口消息监听
 */
export function windowMessageOn(
  channel: string,
  listener: (event: IpcRendererEvent, args: any) => void
) {
  window.ipc.on(`window-message-${channel}-back`, listener);
}

/**
 * 关闭窗口消息监听
 */
export function windowMessageRemove(channel: string) {
  window.ipc.removeAllListeners(`window-message-${channel}-back`);
}

/**
 * 消息发送
 */
export function windowMessageSend(
  channel: string, //监听key（保证唯一）
  value: any, //需要发送的内容
  isback: boolean = false, //是否给自身反馈
  acceptIds: number[] = [] //指定窗口id发送
) {
  const customizeData = customize.get();
  if (acceptIds.length === 0) acceptIds = [customizeData.parentId];
  window.ipc.send('window-message-send', {
    channel,
    value,
    isback,
    acceptIds,
    id: customizeData.id
  });
}

/**
 * 创建窗口
 */
export function windowCreate(args: BrowserWindowConstructorOptions) {
  window.ipc.send('window-new', args);
}

/**
 * 窗口状态
 */
export async function windowStatus(id: number, type: windowStatusOpt) {
  return await window.ipc.invoke('window-status', { type, id });
}

/**
 * 窗口置顶
 */
export function windowAlwaysOnTop(id: number, is: boolean, type?: windowAlwaysOnTopOpt) {
  window.ipc.send('window-always-top-set', { id, is, type });
}

/**
 * 设置窗口大小
 */
export function windowSetSize(
  id: number,
  size: number[],
  resizable: boolean = true,
  center: boolean = false
) {
  window.ipc.send('window-size-set', { id, size, resizable, center });
}

/**
 * 设置窗口最小大小
 */
export function windowSetMinSize(id: number, size: number[]) {
  window.ipc.send('window-min-size-set', { id, size });
}

/**
 * 设置窗口最小大小
 */
export function windowSetMaxSize(id: number, size: number[]) {
  window.ipc.send('window-max-size-set', { id, size });
}

/**
 * 设置窗口背景颜色
 */
export function windowSetBackgroundColor(id: number, color?: string) {
  window.ipc.send('window-bg-color-set', { id, color });
}

/**
 * 最大化&最小化当前窗口
 */
export function windowMaxMin(id: number) {
  window.ipc.send('window-max-min-size', id);
}

/**
 * 关闭窗口 (传id则对应窗口否则全部窗口)
 */
export function windowClose(id?: number) {
  window.ipc.send('window-fun', { type: 'close', id });
}

/**
 * 窗口显示
 * @param id 窗口id
 * @param time 延迟显示时间
 */
export function windowShow(id?: number, time: number = 0) {
  setTimeout(() => window.ipc.send('window-fun', { type: 'show', id }), time);
}

/**
 * 窗口隐藏
 */
export function windowHide(id?: number) {
  window.ipc.send('window-fun', { type: 'hide', id });
}

/**
 * 最小化窗口 (传id则对应窗口否则全部窗口)
 */
export function windowMin(id?: number) {
  window.ipc.send('window-fun', { type: 'minimize', id });
}

/**
 * 最大化窗口 (传id则对应窗口否则全部窗口)
 */
export function windowMax(id?: number) {
  window.ipc.send('window-fun', { type: 'maximize', id });
}

/**
 * 通过路由获取窗口id (不传route查全部)
 */
export function windowIdGet(route?: string): number[] {
  return window.ipc.sendSync('window-id-get', { route });
}
