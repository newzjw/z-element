import type { InjectionKey, Ref } from 'vue';
export type NameType = string | number

export interface CollapseProps {
  modelValue?: NameType[];
  accordion?: boolean;
}

export interface CollapseItemProps {
  name: NameType;
  title?: string;
  disabled?: boolean
}

export interface CollapseContext {
  activeNames: Ref<NameType[]>;
  handleItemClick: (item: NameType) => void
}

export interface CollapseEmits {
  (e: 'update:modelValue', value: NameType[]): void;
  (e: 'change', value: NameType[]): void;
}

// 实现组件间依赖注入的关键代码
// InjectionKey：Vue 3提供的泛型类型，用于在provide/inject模式中提供类型安全
// 使用JavaScript的Symbol创建一个唯一标识符作为键值
// 泛型参数 <CollapseContext> - 指定通过这个键注入的数据类型
export const CollapseContextKey: InjectionKey<CollapseContext> = Symbol('CollapseContextKey');

