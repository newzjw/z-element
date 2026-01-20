<template>
  <div 
    class="zjw-tooltip"
    ref="popperContainerNode"
    v-on="outerEvents"
  >
    <div 
      ref="triggerNode"
      class="zjw-tooltip__trigger"
      v-on="events"
      >
      <slot></slot>
    </div>
    <Transition :name="transition">
      <div 
        v-if="isOpen"
        class="zjw-tooltip__popper" 
        ref="popperNode"
      >
        <slot name="content">
          {{ content }}
        </slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
    
  </div>
</template>

<script setup lang="ts">
// 导入组件、库或工具
import useClickOutside from '@/hooks/useClickOutside';
import type { Instance } from '@popperjs/core';
import { createPopper } from '@popperjs/core';
import { debounce } from 'lodash-es';
import { computed, onUnmounted, reactive, ref, watch } from 'vue';
import type { TooltipEmits, TooltipInstance, TooltipProps } from './types';

defineOptions({
  name: 'ZjwTooltip',
})

// Props 定义
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'right',
  trigger: 'hover',
  transition: 'fade',
  openDelay: 0,
  closeDelay: 0,
});

// 事件定义
const emits = defineEmits<TooltipEmits>()



// 响应式数据
const isOpen = ref(false)
const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const popperContainerNode = ref<HTMLElement>()
let popperInstance: null | Instance = null
// 键为string，值为任意类型
let events: Record<string, any> = reactive({})
let outerEvents: Record<string, any> = reactive({})
// 计算属性
// const doubleCount = computed(() => count.value * 2);
const popperOptions = computed(() => {
  return {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 9],
        },
      }
    ],
    ...props.popperOptions
  }
})
// 方法

const open = () => {
  isOpen.value = true
  emits('visible-change', true)

}
const close = () => {
  isOpen.value = false
  emits('visible-change', false)
}

const openDebounce = debounce(open, props.openDelay)
const closeDebounce = debounce(close, props.closeDelay)

const openFinal = () => {
  closeDebounce.cancel()
  openDebounce()
}
const closeFinal = () => {
  openDebounce.cancel()
  closeDebounce()
}

const togglePopper = () => {
  if (isOpen.value) {
    closeFinal()
  } else {
    openFinal()
  }
}
// 点击外部关闭
useClickOutside(popperContainerNode, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    closeFinal()
  }
  if (isOpen.value) {
    emits('click-outside', true)
  }
})
const attachEvents = () => {
  if (props.trigger === 'hover') {
    outerEvents['mouseenter'] = openFinal
    // events['mouseleave'] = close
    outerEvents['mouseleave'] = closeFinal
  } else if (props.trigger === 'click') {
    // outerEvents['click'] = togglePopper
    events['click'] = togglePopper
  }
}
// watch
if (!props.manual) {
  attachEvents()
}
watch(() => props.manual, (isManual) => {
  if (isManual) {
    events = {}
    outerEvents = {}    
  } else {
    attachEvents()
  }
})
watch(() => props.trigger, (newTrigger, oldTrigger) => {
  if (newTrigger !== oldTrigger) {
    // clear the events
    events = {}
    outerEvents = {}
    attachEvents()
  }
})
watch(isOpen, (newValue) => {
  if (newValue) {
    if (triggerNode.value && popperNode.value) {
      popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value)
    } else {
      popperInstance?.destroy()
    }
  }
}, { flush: 'post'})

// 生命周期
onUnmounted(() => {
  Object.keys(events).forEach(key => {
    delete events[key];
  });
  popperInstance?.destroy()
})

defineExpose<TooltipInstance>({
  'show': open,
  'hide': close
})
</script>

<style scoped>
/* 组件样式 */
</style>