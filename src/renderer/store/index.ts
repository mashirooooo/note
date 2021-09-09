import { reactive } from 'vue';

/**
 * 窗口初始化参数
 */
class CustomizeData {
  private static instance: CustomizeData;

  private data: Customize;

  static getInstance() {
    if (!CustomizeData.instance) CustomizeData.instance = new CustomizeData();
    return CustomizeData.instance;
  }

  constructor() {}

  set(data: Customize) {
    this.data = data;
  }

  get() {
    return this.data;
  }
}

export const customize = CustomizeData.getInstance();

/**
 * 组件页面配置
 * */
export const keepAliveData = reactive<{
  include: string[];
  exclude: string[];
  max: number;
}>({
  include: [],
  exclude: [],
  max: 10
});
export const addInclude = (key: string) => {
  if (keepAliveData.include.indexOf(key) === -1) keepAliveData.include.push(key);
};
export const delInclude = (key: string) => {
  if (keepAliveData.include.indexOf(key) > -1)
    keepAliveData.include.splice(keepAliveData.include.indexOf(key), 1);
};
export const addExclude = (key: string) => {
  if (keepAliveData.exclude.indexOf(key) === -1) keepAliveData.exclude.push(key);
};
export const delExclude = (key: string) => {
  if (keepAliveData.exclude.indexOf(key) > -1)
    keepAliveData.exclude.splice(keepAliveData.exclude.indexOf(key), 1);
};
