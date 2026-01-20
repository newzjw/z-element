<template>
  <div class="zjw-dropdown">
    <ZjwTooltip
      :trigger="trigger" 
      :placement="placement"
      :popper-options="popperOptions"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      :manual="manual"
      @visible-change="visibleChange"
      ref="tooltipRef"
    >
      <slot />
      <template #content>
      <ul class="zjw-dropdown__menu">
        <template v-for="item in menuOptions" :key="item.key">
          <li     
            v-if="item.divided"
            role="separator"
            class="divided-placeholder"
          />
          <li
            class="zjw-dropdown__item"
            @click="itemClick(item)"
            :class="{'is-disabled': item.disabled, 'is-divided': item.divided }"
            :id="`dropdown-item-${item.key}`"
          >
            <RenderVnode :v-node="item.label"/>
          </li>
        </template>
      </ul>
    </template>
    </ZjwTooltip>
  </div>
</template>

<script setup lang="ts">
// 导入组件、库或工具
import ZjwTooltip from "@/components/Tooltip/Tooltip.vue";
import { ref } from 'vue';
import RenderVnode from '../Common/RenderVnode';
import type { TooltipInstance } from '../Tooltip/types';
import type { DropdownEmits, DropdownInstance, DropdownProps, MenuOption } from './types';
defineOptions({
  name: 'ZjwDropdown'
})
// Props 定义
// defineProps<{
//   title?: string;
// }>();
const props = withDefaults(defineProps<DropdownProps>(), { hideAfterClick: true })
const emits = defineEmits<DropdownEmits>()
const tooltipRef = ref<TooltipInstance | null>(null)
// 响应式数据
// const count = ref(0);
// const user = reactive({ name: '', age: 0 });

// 计算属性
// const doubleCount = computed(() => count.value * 2);

// 方法
const visibleChange = (e: boolean) => {
  emits('visible-change', e)
}
const itemClick = (e: MenuOption) => {
  if (e.disabled) {
    return
  }
  emits('select', e)
  if (props.hideAfterClick) {
    tooltipRef.value?.hide()
  }
}
// 生命周期
// onMounted(() => {
//   console.log('组件已挂载');
// });
defineExpose<DropdownInstance>({
  show: () => tooltipRef.value?.show(),
  hide: () => tooltipRef.value?.hide()
})
</script>

<style scoped>
/* 组件样式 */
</style>