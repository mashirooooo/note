<template>
  <div class='container'>
    <Head />
    <div :ref='elDom' class='home-info'>
      <div>hello {{ version }}</div>
      <button @click='toAbout'>关于</button>
      <button @click='toElectron'>打开Electron</button>
      <button @click='test'>弹个框</button>
    </div>
  </div>
</template>

<script lang='ts'>
import type { IpcRendererEvent } from 'electron';
import { defineComponent, onMounted, onUnmounted } from 'vue';
import { customize } from '@/renderer/store';
import {
  windowCreate,
  windowShow,
  windowMessageOn,
  windowMessageRemove
} from '@/renderer/common/window';
import { getGlobal } from '@/renderer/common';
import { menuShow, menuOn, menuListenersRemove } from '@/renderer/common/menu';
import Head from '@/renderer/views/components/head/index.vue';

export default defineComponent({
  components: {
    Head
  },
  name: 'Home',
  setup() {
    const customizeData = customize.get();

    function elDom(element: HTMLElement) {
      if (!element) return;
      element.oncontextmenu = () => {
        menuShow();
      };
    }

    menuOn((event, args) => {
      console.log(args);
    });

    windowMessageOn('test', (event: IpcRendererEvent, args: any) => {
      //监听弹框测试
      console.log(args);
    });

    function test() {
      windowCreate({
        customize: {
          title: '弹框测试',
          route: '/message',
          parentId: customizeData.id,
          data: { text: '123' }
        },
        modal: true,
        resizable: true
      });
    }

    function toAbout() {
      windowCreate({
        customize: {
          route: '/about',
          isMainWin: true
        },
        width: 300,
        height: 300,
        resizable: true
      });
    }

    function toElectron() {
      windowCreate({
        customize: {
          url: 'https://electronjs.org/',
          parentId: customizeData.id
        },
        width: 800,
        height: 600,
        resizable: true
      });
    }

    onMounted(() => {
      windowShow(customizeData.id);
    });

    onUnmounted(() => {
      windowMessageRemove('test'); //关闭监听
      menuListenersRemove();
    });

    return {
      elDom,
      test,
      toAbout,
      toElectron,
      version: getGlobal('app.version')
    };
  }
});
</script>

<style lang='scss' scoped>
@import './scss/index';
</style>
