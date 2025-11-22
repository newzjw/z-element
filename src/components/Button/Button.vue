<template>
    <button
      ref="_ref"
      class="zjw-button"
      :class="{
        [`zjw-button--${type}`]: type,
        [`zjw-button--${size}`]: size,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
        'is-disabled': disabled,
      }"
      :disabled="disabled"
      :autofocus="autoFocus"
      :type="nativeType"
    >
      test button
    </button>
</template>

<script setup lang="ts">
// Component logic here
import { ref } from 'vue';
import { ButtonProps } from './types';
defineOptions({
  name: 'ZjwButton',
})
withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
  size: 'medium',
  plain: false,
  round: false,
  circle: false,
  disabled: false,
  nativeType: 'button',
  autoFocus: false,
})
const _ref = ref<HTMLElement | null>();
const bcd = ref(2)
defineExpose({
  ref: _ref,
  bcd,
})
</script>

<style scoped>
/* Component styles here */
</style>
