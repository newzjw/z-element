<template>
  <Transition 
    :name="transitionName"
    @after-leave="destroyComponent"
    @enter="updateHeight"
  >
    <div 
    class="zjw-message"
    v-show="visible"
    :class="{
      [`zjw-message--${type}`]: type,
      [`zjw-message--show-close`]: showClose,
    }"
    role="alert"
    ref="messageRef"
    :style="cssStyle"
    @mouseenter="clearTimer"
    @mouseleave="startTimer"
    >
      <div class="zjw-message__content">
        <slot>
          <RenderVnode :vNode="message" v-if="message" />
        </slot>
      </div>
      <div class="vk-message__close" v-if="showClose">
        <Icon @click.stop="visible = false" icon="xmark"/>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import useEventListener from '@/hooks/useEventListener';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import RenderVnode from '../Common/RenderVnode';
import Icon from '../Icon/Icon.vue';
import { getLastBottomOffset } from './method';
import { MessageProps } from './types';

// 导入组件、库或工具
// import { ref, reactive, onMounted } from 'vue'

// Props 定义
const props = withDefaults(defineProps<MessageProps>(), {
  duration: 3000,
  type: 'info',
  offset: 20,
  transitionName: 'fade-up'
})

// 事件定义
// const emit = defineEmits<{
//   click: [value: string];
// }>();

// 响应式数据
const visible = ref(false)
const messageRef = ref<HTMLDivElement>()
// 计算属性
const height = ref(0)
// 上一个实例的最下面的坐标数字，第一个是 0
const lastOffset = computed(() => getLastBottomOffset(props.id))
// 这个元素应该使用的 top
const topOffset = computed(() => props.offset + lastOffset.value)
// 这个元素为下一个元素预留的 offset，也就是它最低端 bottom 的 值
const bottomOffset = computed(() => height.value + topOffset.value)
const cssStyle = computed(() => ({
  top: topOffset.value + 'px',
  zIndex: props.zIndex
}))
// 方法
let timer: any
function startTimer() {
  if (props.duration === 0) return
  timer = setTimeout(() => {
    visible.value = false
  }, props.duration)
}
function clearTimer() {
  clearTimeout(timer)
}
function keydown(e: Event) {
  const event = e as KeyboardEvent
  if (event.code === 'Escape') {
    visible.value = false
  }
}
useEventListener(document, 'keydown', keydown)
// watch(visible, (newValue) => {
//   if (!newValue) {
//     props.onDestroy()
//   }
// })
function destroyComponent () {
  props.onDestroy()
}
function updateHeight() {
  height.value = messageRef.value!.getBoundingClientRect().height
}
onMounted(async () => {
  visible.value = true
  startTimer()
  // await nextTick()
  // height.value = messageRef.value!.getBoundingClientRect().height
})
onUnmounted(() => {
  clearTimeout(timer)
})

// 生命周期
// onMounted(() => {
//   console.log('组件已挂载');
// });

defineExpose({
  bottomOffset,
  visible
})
</script>

<style scoped>
/* 组件样式 */
.zjw-message {
  width: max-content;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid #000;
}
</style>