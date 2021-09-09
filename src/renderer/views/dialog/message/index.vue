<template>
  <div class='container'>
    <Head />
    <div class='message-info'>
      <div class='text'>
        <div>创建传参: {{ data.text }}</div>
        <div>app启动参数: {{ argv }}</div>
      </div>
      <button @click='test'>测试通讯</button>
      <button @click='test1'>测试获取路由id</button>
      <button class='close' @click='close'>确定</button>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted } from 'vue';
import { customize } from '@/renderer/store';
import { getGlobal } from '@/renderer/common';
import {
  windowClose,
  windowSetSize,
  windowShow,
  windowIdGet,
  windowMessageSend
} from '@/renderer/common/window';
import Head from '@/renderer/views/components/head/index.vue';

export default defineComponent({
  components: {
    Head
  },
  name: 'Message',
  setup() {
    const customizeData = customize.get();
    const argv = getGlobal('app.argv');
    let cons = 0;
    windowSetSize(customizeData.id, [400, 200], true, customizeData.currentMaximized);

    function test() {
      //测试发送窗口发送消息
      windowMessageSend('test', {
        value: cons++
      });
    }

    function test1() {
      console.log(windowIdGet());
    }

    function close() {
      windowClose(customizeData.id);
    }

    onMounted(() => {
      windowShow(customizeData.id);
    });

    return {
      data: customizeData.data,
      test,
      argv,
      close,
      test1
    };
  }
});
</script>

<style lang='scss' scoped>
@import './scss/index';
</style>
