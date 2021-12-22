import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from "vite-plugin-pages"
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: [
        'vue',
        'vue-router',
        // {
        //   ...Object.keys(composablePaths).reduce((acc, name) => ({
        //     ...acc,
        //     [composablePaths[name]]: [
        //       ['default', name],
        //     ],
        //   }), {}),
        // },
      ],
    }),
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
      resolvers: [
        (name) => {
          if (name.includes('IconSolid')) {
            const realName = name.split('Solid')[0]
            return { importName: 'default', path: `@heroicons/vue/solid/esm/${realName}.js` }
          }
          if (name.includes('IconOutline')) {
            const realName = name.split('Outline')[0]
            return { importName: 'default', path: `@heroicons/vue/outline/esm/${realName}.js` }
          }
        },
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
