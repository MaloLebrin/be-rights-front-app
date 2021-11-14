import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from "vite-plugin-pages"
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Pages({
      pagesDir: 'src/pages',
    }),
    Components({
      dts: 'src/types/shims/components.d.ts',
      dirs: [
        'src/components',
        'src/pages',
      ],
      include: [/\.vue$/, /\.vue\?vue/],
      extensions: ['vue'],

    }),
    Layouts({
      defaultLayout: 'DefaultLayout'
    }),
  ],
  resolve: {
    alias: {
      // '~/': `${path.resolve(__dirname, 'src')}/`,
      '@': `${path.resolve(__dirname, 'src')}/`,
    },
  },

})
