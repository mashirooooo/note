import path from 'path';
import { ipcMain } from 'electron';

export function sep() {
  return path.sep;
}

export function isAbsolute(str: string) {
  return path.isAbsolute(str);
}

export function dirname(str: string) {
  return path.dirname(str);
}

export function normalize(str: string) {
  return path.normalize(str);
}

export function basename(str: string) {
  return path.basename(str);
}

export function pathOn() {
  ipcMain.on('path-sep', async (event, args) => (event.returnValue = sep()));
  ipcMain.on('path-isAbsolute', async (event, args) => (event.returnValue = isAbsolute(args)));
  ipcMain.on('path-func', async (event, args) => (event.returnValue = dirname(args)));
  ipcMain.on('path-normalize', async (event, args) => (event.returnValue = normalize(args)));
  ipcMain.on('path-basename', async (event, args) => (event.returnValue = basename(args)));
}
