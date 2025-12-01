<template>
  <i class="zjw-icon" :class="{[`zjw-icon--${type}`] : type }" :style="customStyles" v-bind="$attrs">
    <font-awesome-icon v-bind="filteredProps"/>
  </i>
</template>

<script setup lang="ts">
// 导入组件、库或工具
// import { ref, reactive, onMounted } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { omit } from 'lodash-es';
import { computed } from 'vue';
// import type { FontAwesomeIconProps } from './types';
import type { IconProps } from './types';
defineOptions({
  name: 'ZjwIcon',
  inheritAttrs: false, // 禁用默认的属性继承行为
})
// Props 定义
// defineProps<{
//   title?: string;
// }>();
const props = defineProps<IconProps>();
// 事件定义
// const emit = defineEmits<{
//   click: [value: string];
// }>();

// 响应式数据
// const count = ref(0);
// const user = reactive({ name: '', age: 0 });

// 计算属性
// const doubleCount = computed(() => count.value * 2);
// 过滤掉 type 和 color 属性，避免它们被传递给 FontAwesomeIcon 组件
const filteredProps = computed(() => omit(props, ['type', 'color']))
const customStyles = computed(() => {
  return props.color ? { color: props.color } : {}
})
// 方法
// const handleClick = () => {
//   count.value++;
//   emit('click', 'clicked');
// };

// 生命周期
// onMounted(() => {
//   console.log('组件已挂载');
// });
</script>

<style scoped>
/* 组件样式 */
</style>