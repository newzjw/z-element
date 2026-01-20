import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import Tooltip from './Tooltip.vue'
// 通过 vi.mock() 模拟这个库，避免在测试中实际调用它
// 在单元测试中，我们不关心 Popper.js 的具体实现，只关心 Tooltip 组件的逻辑是否正确。
vi.mock('@popperjs/core')
const onVisibleChange = vi.fn()
describe('Tooltip.vue', () => {
  // 这个配置告诉Vitest使用虚拟的定时器系统，而不是真实的系统定时器，这样vi.runAllTimers()才能正常工作。
  beforeEach(() => {
    vi.useFakeTimers()
  })
  test('basic tooltip', async () => {
    const wrapper = mount(() => 
    <div>
      <div id="outside"></div>
      <Tooltip content="hello tooltip" trigger='click' onVisible-change={onVisibleChange}>
        <button id="trigger">Trigger</button>
      </Tooltip>
    </div>
    , {
      attachTo: document.body
    })
    // 静态测试
    const triggerArea = wrapper.find('#trigger')
    expect(triggerArea.exists()).toBeTruthy()
    expect(wrapper.find('.zjw-tooltip__popper').exists()).toBeFalsy()
    console.log('before', wrapper.html())
    // 测试点击行为
    triggerArea.trigger('click')
    // 用于立即执行所有待处理的定时器，包括setTimeout、setInterval等异步操作。
    await vi.runAllTimers()
    expect(wrapper.find('.zjw-tooltip__popper').exists()).toBeTruthy()
    expect(wrapper.get('.zjw-tooltip__popper').text()).toBe('hello tooltip')
    expect(onVisibleChange).toHaveBeenCalledWith(true)
    console.log('after', wrapper.html())
    wrapper.get('#outside').trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.zjw-tooltip__popper').exists()).toBeFalsy()
    expect(onVisibleChange).toHaveBeenLastCalledWith(false)
  })
})