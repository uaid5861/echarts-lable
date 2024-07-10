import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postCssPxToRem from 'postcss-pxtorem'
import { resolve } from 'path';
import pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),pages()],
  base: '/echarts-lable/',
  // css: {
  //   postcss: {
  //     plugins: [
  //       postCssPxToRem({
  //         // 自适应，px>rem转换
  //         rootValue: 16,
  //         propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
  //         selectorBlackList: ['norem'], // 过滤掉norem-开头的class，不进行rem转换，这个内容可以不写
  //       }),
  //     ],
  //   },
  // },
  resolve: {
    alias: {
        // @ 替代为 src
      '@': resolve(__dirname, 'src'),
       // @component 替代为 src/component
      '@components': resolve(__dirname, 'src/components'),
    },
  },
})
