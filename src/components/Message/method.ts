import useZIndex from "@/hooks/useZIndex";
import { h, render, shallowReactive } from "vue";
import MessageConstructor from './Message.vue';
import { CreateMessageProps, MessageContext } from "./types";

let seed = 1
// 每次调用createMessage，生成一个实例，instances数组用于保存这些实例
const instances: MessageContext[] = shallowReactive([])
export const createMessage = (props: CreateMessageProps) => {
  const { nextZIndex } = useZIndex()
  const id = `message_${seed++}`
  const container = document.createElement('div');
  const destroy = () => {
    // 删除数组中的实例
    const idx = instances.findIndex(instance => instance.id === id)
    if (idx === -1) return
    instances.splice(idx, 1)
    render(null, container)
  }
  // 手动调用删除，其实就是手动的调整组件中 visible 的值
  // visible 是通过 expose 传出来的
  const manualDestroy = () => {
    const instance = instances.find(instance => instance.id === id)
    if (instance) {
      instance.vm.exposed!.visible.value = false
    }
  }
  const newProps = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestroy: destroy,
  }
  const vNode = h(MessageConstructor, newProps);
  render(vNode, container)
  document.body.appendChild(container.firstElementChild!)
  const vm = vNode.component!
  const instance = {
    id,
    vNode,
    vm,
    props: newProps,
    destroy: manualDestroy
  }
  instances.push(instance)
  return instance
}

export const getLastBottomOffset = (id: string) => {
  const idx = instances.findIndex(instance => instance.id === id)
  console.log('idx', id, idx, instances.length)
  if (idx <= 0) {
    return 0
  } else {
    const prev = instances[idx - 1]
    return prev.vm.exposed!.bottomOffset.value
  }
}

export const closeAll = () => {
  instances.forEach(instance => {
    instance.destroy()
  })
}