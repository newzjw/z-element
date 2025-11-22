<script setup lang="ts">
import ZjwButton from '@/components/Button/Button.vue';
import type { ButtonInstance } from '@/components/Button/types';
import { onMounted, ref } from 'vue';

// const buttonRef = ref<InstanceType<typeof ZjwButton> | null>(null)
// const buttonRef = ref()

// 创建一个响应式引用，用于获取对Button组件实例的引用
// 表示这个ref可以存储ButtonInstance类型或null值，(null) - 初始化ref的值为null，因为在组件挂载前，ref引用的组件实例还不存在
const buttonRef = ref<ButtonInstance | null>(null)

onMounted(() => {
  // Vue会在组件挂载后将ZjwButton组件实例赋值给buttonRef
  if (buttonRef.value) {
    console.log(buttonRef.value.ref)
  }
})
</script>

<template>
  <ZjwButton ref="buttonRef">Test ZjwButton</ZjwButton>
    <ZjwButton plain>Plain ZjwButton</ZjwButton>
    <ZjwButton round>Round ZjwButton</ZjwButton>
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
    <ZjwButton size="large" loading>Loading</ZjwButton>
    <ZjwButton size="large" icon="arrow-up">Icon</ZjwButton><br/><br/>  
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
