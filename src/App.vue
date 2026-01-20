<script setup lang="ts">
import ZjwButton from '@/components/Button/Button.vue';
import type { ButtonInstance } from '@/components/Button/types';
import ZjwCollapse from '@/components/Collapse/Collapse.vue';
import ZjwCollapseItem from '@/components/Collapse/CollapseItem.vue';
import type { MenuOption } from '@/components/Dropdown/types';
import ZjwIcon from '@/components/Icon/Icon.vue';
// import ZjwMessage from '@/components/Message/Message.vue';
import { createMessage } from '@/components/Message/method';
import ZjwTooltip from '@/components/Tooltip/Tooltip.vue';
import type { Options } from '@popperjs/core';
import ZjwDropdown from './components/Dropdown/Dropdown';


import type { TooltipInstance } from '@/components/Tooltip/types';

import { h, onMounted, ref } from 'vue';

// const buttonRef = ref<InstanceType<typeof ZjwButton> | null>(null)
// const buttonRef = ref()

// 创建一个响应式引用，用于获取对Button组件实例的引用
// 表示这个ref可以存储ButtonInstance类型或null值，(null) - 初始化ref的值为null，因为在组件挂载前，ref引用的组件实例还不存在
const buttonRef = ref<ButtonInstance | null>(null)
// 创建一个响应式引用，用于获取对Tooltip组件实例的引用
const tooltipRef = ref<TooltipInstance | null>(null)


const openedValue = ref(['d'])
// const trigger = ref<any>('click')
const options: Partial<Options> = {
  placement: 'right-end',
  strategy: 'fixed',
}
const MenuOptions: MenuOption[] = [
  { key: 1, label: h('b', 'this is bold') },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' }
]
const inlineConsole = (...args: any) => {
  console.log(...args)
}

const open = () => {
  tooltipRef.value?.show()
}
const close = () => {
  tooltipRef.value?.hide()
}
onMounted(() => {
  // Vue会在组件挂载后将ZjwButton组件实例赋值给buttonRef
  if (buttonRef.value) {
    // console.log(buttonRef.value.ref)
  }
  setTimeout(() => {
    openedValue.value = ['a']
  }, 2000)
    createMessage({
      type: 'success',
      message: '这是一条成功的消息',
      duration: 0,
      showClose: true,
    })
    createMessage({
      type: 'success',
      message: '这是一条成功的消息22222',
      showClose: true,
    })
    createMessage({
      type: 'success',
      message: '这是一条成功的消息2222233333',
      duration: 0,
      showClose: true,
    })
})
</script>

<template>
  <!-- <ZjwMessage type="success" message="这是一条成功消息" :duration="0" show-close /> -->
  <ZjwDropdown 
    placement="bottom" 
    trigger="click" 
    :menu-options="MenuOptions"
    @visible-change="e => inlineConsole('visible change', e)"
    @select="e => inlineConsole('select', e)"
    ref="tooltipRef"
  >
    <img alt="Vue logo" class="logo" src="./assets/vue.svg" width="125" height="125"/>
  </ZjwDropdown>
  <ZjwTooltip 
  trigger="click" 
  ref="tooltipRef"
  :popper-options="options"
  @visible-change="e => inlineConsole('visible change', e)"
  :open-delay="2000"
  :close-delay="1000"
  >
    <template #content>
      <h2>这是一个提示信息</h2>
    </template>
    <!-- <img src="./assets/vue.svg" alt=""> -->
    <ZjwButton ref="buttonRef">Test ZjwButton</ZjwButton>
  </ZjwTooltip>
    <ZjwButton plain @click="open">Plain ZjwButton</ZjwButton>
    <ZjwButton round2 @click="close">Round ZjwButton</ZjwButton>
    <ZjwButton circle>VK</ZjwButton>
    <ZjwButton disabled>Disabled ZjwButton</ZjwButton><br/><br/>
    <ZjwButton type="primary">Primary</ZjwButton>
    <ZjwButton type="success">Success</ZjwButton>
    <ZjwButton type="info">Info</ZjwButton>
    <ZjwButton type="warning">Warning</ZjwButton>
    <ZjwButton type="danger">Danger</ZjwButton><br/><br/>
    <ZjwButton type="primary" plain>Primary</ZjwButton>
    <ZjwButton type="success" plain>Success</ZjwButton>
    <ZjwButton type="info" plain>Info</ZjwButton>
    <ZjwButton type="warning" plain>Warning</ZjwButton>
    <ZjwButton type="danger" plain>Danger</ZjwButton><br/><br/>
    <ZjwButton size="large">Large</ZjwButton>
    <ZjwButton size="small">Small</ZjwButton><br/><br/>
    <ZjwButton size="large" loading>Loading...</ZjwButton>
    <ZjwButton size="large" icon="arrow-up">Icon</ZjwButton><br/><br/>  

    <ZjwCollapse v-model="openedValue" accordion>
      <ZjwCollapseItem name="a" title="项目11">
        项目1的内容
      </ZjwCollapseItem>
      <ZjwCollapseItem name="b" title="项目22">
        项目2的内容
      </ZjwCollapseItem>
      <ZjwCollapseItem name="c" title="项目33" disabled>
        项目3的内容
      </ZjwCollapseItem>
      <ZjwCollapseItem name="d" title="项目44">
        项目4的内容
      </ZjwCollapseItem>
    </ZjwCollapse>
     <!-- 使用solid样式图标 -->
    <!-- <font-awesome-icon icon="user" /> -->
    
    <!-- 使用带前缀的图标（如果导入了其他样式如regular或brands） -->
    <!-- <font-awesome-icon :icon="['fas', 'user']" /> -->
    
    <!-- 设置大小 -->
    <!-- <font-awesome-icon icon="user" size="2x" /> -->
    
    <!-- 添加旋转效果 -->
    <!-- <font-awesome-icon icon="spinner" spin /> -->
     <ZjwIcon icon="arrow-up" border size="10x" title="向上箭头"
     type="danger"/>
     <ZjwIcon icon="arrow-up" border size="10x" title="向上箭头"
     type="primary" color="yellow"/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
