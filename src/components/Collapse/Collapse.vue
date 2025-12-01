<template>
  <div class="zjw-collapse">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
// 导入组件、库或工具
import { provide, ref, watch } from 'vue';
import type { CollapseEmits, CollapseProps, NameType } from './types';
import { CollapseContextKey } from './types';
// Props 定义
defineOptions({
  name: 'ZjwCollapse',
})
const props = defineProps<CollapseProps>();
const emits = defineEmits<CollapseEmits>();
const activeNames = ref<NameType[]>(props.modelValue || []);
// 确保了组件内部状态与外部传入的modelValue保持同步。
watch(() => props.modelValue, () => {
  activeNames.value = props.modelValue || [];
})
if (props.accordion && activeNames.value.length > 1) {
  console.warn('accordion 模式下，只能激活一个项目');
  // 只保留第一个激活项
  // activeNames.value = activeNames.value.slice(0, 1);
}
// defineProps<{
//   title?: string;
// }>();

// 事件定义
// const emit = defineEmits<{
//   click: [value: string];
// }>();

// 响应式数据
// const count = ref(0);
// const user = reactive({ name: '', age: 0 });

// 计算属性
// const doubleCount = computed(() => count.value * 2);

// 方法
// const handleClick = () => {
//   count.value++;
//   emit('click', 'clicked');
// };
const handleItemClick = (item: NameType) => {
  let _activeNames = [...activeNames.value];
  const index = _activeNames.indexOf(item);
  if (props.accordion) {
    _activeNames = [activeNames.value[0] === item ? '' : item];
  } else {
    if (index > -1) {
      _activeNames.splice(index, 1);
    } else {
      _activeNames.push(item);
    }
  }
  activeNames.value = _activeNames;
  // 同步更新v-model绑定的值
  emits('update:modelValue', _activeNames);
  emits('change', _activeNames);
}

provide(CollapseContextKey, {
  activeNames,
  handleItemClick,
});

// 生命周期
// onMounted(() => {
//   console.log('组件已挂载');
// });
</script>

<style scoped>
/* 组件样式 */
</style>