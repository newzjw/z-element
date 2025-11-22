import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

import vueJsx from '@vitejs/plugin-vue-jsx'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    eslint()
  ],
  resolve: {
    alias: {
      // fileURLToPath： Node.js 的一个工具函数，用于将文件 URL 转换为平台特定的文件路径字符串。
      // new URL('./src', import.meta.url)： 创建一个新的 URL 对象，指向当前模块所在目录的 src 子目录。
      // import.meta.url： 当前模块的 URL 字符串。
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
