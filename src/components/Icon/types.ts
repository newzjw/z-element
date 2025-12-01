export type { FontAwesomeIconProps } from '@fortawesome/vue-fontawesome';

// import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { FontAwesomeIconProps } from '@fortawesome/vue-fontawesome';
export interface IconProps extends FontAwesomeIconProps {
  type?: 'primary'| 'success'| 'warning'| 'danger'| 'info'
  color?: string
}