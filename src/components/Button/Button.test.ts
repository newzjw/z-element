import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import ZjwIcon from '../Icon/Icon.vue';
import Button from './Button.vue';
describe('Button', () => {
  // test('renders correctly', () => {
  //   const wrapper = mount(Button, {
  //     props: {
  //       type: 'primary'
  //     },
  //     slots: {
  //       default: 'button1'
  //     }
  //   });
  //   console.log(wrapper.html());
  //   // expect(wrapper.html()).toMatchSnapshot();
  //   expect(wrapper.classes()).toContain('zjw-button--primary');
  //   // 测试slot
  //   expect(wrapper.get('button').text()).toBe('button1');
  //   wrapper.get('button').trigger('click');
  //   expect(wrapper.emitted()).toHaveProperty('click');
  // });

  // test('disabled', () => {
  //   const wrapper = mount(Button, {
  //     props: {
  //       disabled: true
  //     },
  //     slots: {
  //       default: 'disabled'
  //     }
  //   })
  //   // attributes，判断是否有disabled属性
  //   expect(wrapper.attributes('disabled')).toBeDefined()
  //   // attributes
  //   expect(wrapper.find('button').element.disabled).toBeDefined()
  //   wrapper.get('button').trigger('click')
  //   expect(wrapper.emitted()).not.toHaveProperty('click')
  // })
  /**
   * 在main.ts中，Font Awesome 图标是这样初始化的：
   * import { library } from '@fortawesome/fontawesome-svg-core';
    import { fas } from '@fortawesome/free-solid-svg-icons';
      library.add(fas);
      但是在测试环境中，Vue Test Utils 只会渲染单个组件，而不会执行 main.ts 中的初始化代码。因此，当测试 Button 组件时，Font Awesome 的图标库没有被正确注册。
      当按钮组件尝试渲染 arrow-up 图标时，Font Awesome 无法在其库中找到这个图标，会报错。
   */

  test('icon', () => {
    const wrapper = mount(Button, {
     props: {
        icon: 'arrow-up'
      },
      slots: {
        default: 'icon'
      },
      global: {
        // stub 组件，避免依赖外部组件的具体实现
        // stubs 数组用于告诉测试工具用简单的替代组件（stub）来替换实际组件，避免依赖外部组件的具体实现。
        // 当使用这个配置时，Vue Test Utils 会在渲染 Button 组件时，自动将其内部使用的 <font-awesome-icon> 标签替换为一个简单的占位元素。这个占位元素会保留原始组件的基本结构，但不会执行实际的 Font Awesome 图标渲染逻辑。
        stubs: ['FontAwesomeIcon']
      }
    });
    const iconElement = wrapper.findComponent(FontAwesomeIcon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('arrow-up')
  })
  test('loading', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      },
      slots: {
        default: 'loading'
      },
      global: {
        stubs: ['ZjwIcon']
      }
    })
    const iconElement = wrapper.findComponent(ZjwIcon)
    console.log(iconElement.html())
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('spinner')
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
});