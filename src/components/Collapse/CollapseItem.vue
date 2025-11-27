<template>
  <div 
    class="zjw-collapse-item"
    :class="{'is-disabled': disabled}"
  >
    <div 
      class="zjw-collapse__item-header"
      :class="{
        'is-disabled': disabled
      }"
      @click="handleClick"
    >
      <slot name="title">{{title}}</slot>
      
    </div>
    <Transition name="slide" v-on="transitionEvents">
      <div class="zjw-collapse-item__wrapper" v-show="isActive">
        <div class="zjw-collapse-item__content" :id="`item-content-${name}`">
          <slot>内容内容</slot>
        </div>
      </div>
    </Transition>
    
    
  </div>
</template>

<script setup lang="ts">
// 导入组件、库或工具
import { computed, inject } from 'vue';
import type { CollapseItemProps } from './types';
import { CollapseContextKey } from './types';
defineOptions({
  name: 'ZjwCollapseItem',
})

// Props 定义
const props = defineProps<CollapseItemProps>()
const collapseContext = inject(CollapseContextKey);
// defineProps<{
//   title?: string;
// }>();

// 事件定义
// const emit = defineEmits<{
//   click: [value: string];
// }>();
const handleClick = () => {
  if (props.disabled) return;
  collapseContext?.handleItemClick(props.name);
}
// 响应式数据
// const count = ref(0);
// const user = reactive({ name: '', age: 0 });

// 计算属性
// const doubleCount = computed(() => count.value * 2);
const isActive = computed(() => {
  return collapseContext?.activeNames.value.includes(props.name);
})
// 方法
// const handleClick = () => {
//   count.value++;
//   emit('click', 'clicked');
// };
const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    el.style.height = '0px'
    el.style.overflow = 'hidden'
  },
  enter(el) {
    el.style.height = `${el.scrollHeight}px`
  },
  afterEnter(el) {
    el.style.height = ''
    el.style.overflow = ''
  },
  beforeLeave(el) { 
    el.style.height = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },
  leave(el) {
    el.style.height = '0px'
  },
  afterLeave(el) {
    el.style.height = ''
    el.style.overflow = ''
  }
}
// 生命周期
// onMounted(() => {
//   console.log('组件已挂载');
// });
</script>

<style scoped>
/* 组件样式 */
</style>