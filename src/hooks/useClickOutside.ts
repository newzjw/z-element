import type { Ref } from 'vue'
import { onMounted, onUnmounted } from 'vue'
/**
 * 
 * @param elementRef 在哪个元素之外
 * @param callback 
 */
const useClickOutside = (elementRef: Ref<undefined | HTMLElement>, callback: (e: MouseEvent) => void) => {
  const handler = (e: MouseEvent) => {
    if (elementRef.value && e.target) {
      // 当点击目标不是这个节点而且不是这个节点的子节点，就调用回调
      if (!elementRef.value.contains(e.target as HTMLElement)) {
        callback(e)
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
}

export default useClickOutside;