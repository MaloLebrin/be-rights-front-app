import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from "vite-plugin-pages"
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import { HeadlessUiResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path'
import { BeRightUiResolver } from './src/utils/resolver/BeRightComponentLibrary'
import { getDirectoryAuthImportPaths, EXCLUDES_STORE_FOLDER_NAME } from './src/utils/resolver/autoImportUtils'

const STORE_PATH = './src/store'
const HOOKS_PATH = './src/hooks'

const hookPaths = getDirectoryAuthImportPaths(HOOKS_PATH)
const storePaths = getDirectoryAuthImportPaths(STORE_PATH)

// console.log((storePaths), 'storePaths')


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({
      dts: 'src/types/shims/auto-imports.d.ts',
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          ...Object.keys(hookPaths).reduce((acc, name) => {
            // console.log({
            //   ...acc,
            //   [hookPaths[name].replace('./src/', '@/')]: [
            //     ['default', name],
            //   ],
            // }, 'dddddddd')
            return {
              ...acc,
              [hookPaths[name].replace('./src/', '@/')]: [
                ['default', name],
              ],
            }
          }, {}),
          ...Object.keys(storePaths).reduce((acc, name) => {
            const hookName = `use${name[0].toUpperCase()}${name.substring(1)}`
            if (!EXCLUDES_STORE_FOLDER_NAME.includes(name)) {
              return {
                ...acc,
                [`${storePaths[name]}`.replace(`./src/`, '@/')]: [
                  [hookName, hookName],
                ],
              }
            }
          }, {}),
        },
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
        HeadlessUiResolver(''),
        BeRightUiResolver().resolve,
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
