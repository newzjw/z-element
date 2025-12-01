import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import Button from './Button.vue';

describe('Button', () => {
  test('renders correctly', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary'
      },
      slots: {
        default: 'button'
      }
    });
    console.log(wrapper.html());
    expect(wrapper.html()).toMatchSnapshot();
  });
});