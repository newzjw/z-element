type ButtonType = 'primary' | 'success' | 'info' | 'warning' | 'danger'
type ButtonSize = 'small' | 'medium' | 'large'
// button元素的原生type属性
type NativeType = 'button' | 'submit' | 'reset'

export interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  disabled?: boolean;
  nativeType?: NativeType;
  // 原生属性
  autoFocus?: boolean;
  loading?: boolean;
}

export interface ButtonInstance {
  ref: HTMLButtonElement;
}