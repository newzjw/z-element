import axios from 'axios';
import { describe, expect, Mocked, test, vi } from 'vitest';
import { request } from './utils';
vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>
// test('zjw.test', () => {
//   const a = 5;
//   expect(1).toBe(1);
//   expect(a).toBe(5);
//   expect(2+2).not.toBe(5);
// });

// function add(a: number, b: number) {
//   return a + b
// }

// test('add 函数应该正确计算两数之和', () => {
//   const result = add(1, 2) // 实际结果
//   expect(result).toBe(3)   // 断言：预期结果是 3
//   expect({ a: 1 }).toEqual({ a: 1 }) // ✅ 内容一致即可
//   expect([1, 2]).toEqual([1, 2])
//   function throwError() {
//     throw new Error('something wrong')
//   }

//   expect(throwError).toThrow()                // 抛出任意异常
//   expect(throwError).toThrow('something wrong') // 抛出指定消息的异常
// })
test('mock 函数跟踪调用', () => {
  const mockFn = vi.fn() // 创建 Mock 函数
  
  mockFn(123) // 调用函数
  mockFn(456)
  expect(mockFn).toHaveBeenCalled() // 断言已调用
  expect(mockFn).toHaveBeenCalledWith(456) // 断言调用参数正确
  expect(mockFn).toHaveBeenCalledTimes(2) // 断言调用次数
})

describe('functions', () => {
  test('mock third party module', async () => {
    // mockedAxios.get.mockImplementation(() => Promise.resolve({ data: 123 }))
    mockedAxios.get.mockResolvedValue({ data: 123 })
    const result = await request()
    expect(result).toBe(123)
  })
});