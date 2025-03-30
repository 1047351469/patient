import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import { createHtmlPlugin } from 'vite-plugin-html'
import { viteMockServe } from 'vite-plugin-mock'


// https://vite.dev/config/
export default defineConfig({
  base: './', // 使用相对路径
  build: {
    outDir: 'dist'
  },
  test: {
    environment: 'happy-dom'
  },
  
  plugins: [
    vue(),
    vueDevTools(),
    createHtmlPlugin(),
    viteMockServe({
      // 在哪个文件夹下编写模拟接口的代码
      mockPath: './src/mock',
      // 在开发环境开启mock
      localEnabled: true
    }),
    // 自动导入的插件，解析器可以是 vant element and-vue 
    Components({
      dts: false,
      // 原因：Toast Confirm 这类组件的样式还是需要单独引入，样式全局引入了，关闭自动引入
      resolvers: [VantResolver({ importStyle: false })]
    }),
    createSvgIconsPlugin({
           // 指定图标文件夹，绝对路径（NODE代码）
           iconDirs: [path.resolve(process.cwd(), 'src/icons')]
         })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
