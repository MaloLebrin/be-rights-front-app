import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import { HeadlessUiResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import {
  getDirectoryAuthImportPaths,
  getStoreFileNames,
} from './src/utils/resolver/autoImportUtils'

const STORE_PATH = './src/store'
const HOOKS_PATH = './src/hooks'

const hookPaths = getDirectoryAuthImportPaths(HOOKS_PATH)
const storePaths = getDirectoryAuthImportPaths(STORE_PATH)
const storeFileNames = getStoreFileNames()

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
          'vue-toastification': [
            'useToast',
          ],
        },
        {
          ...Object.keys(hookPaths).reduce((acc, name) => {
            return {
              ...acc,
              [hookPaths[name].replace('./src/', '@/')]: [
                ['default', name],
              ],
            }
          }, {}),
          ...Object.keys(storeFileNames).reduce((acc, name) => {
            const hookName = `use${name[0].toUpperCase()}${name.substring(1)}Store`
            return {
              ...acc,
              [`${storePaths[name]}`.replace('./src/', '@/')]: [
                [hookName, hookName],
              ],
            }
          }, {}),
        },
      ],
    }),
    vue(),
    Components({
      dts: 'src/types/shims/components.d.ts',
      dirs: [
        'src/components',
        'src/pages',
      ],
      resolvers: [
        HeadlessUiResolver({}),
        name => {
          if (name.includes('IconSolid')) {
            const realName = name.split('Solid')[0]
            return { importName: 'default', path: `@heroicons/vue/solid/esm/${realName}.js` }
          }
          if (name.includes('IconOutline')) {
            const realName = name.split('Outline')[0]
            return { importName: 'default', path: `@heroicons/vue/outline/esm/${realName}.js` }
          }
        },
        name => {
          if (['Form', 'Field', 'ErrorMessage', 'FieldArray'].includes(name)) {
            return {
              importName: name,
              path: 'vee-validate',
            }
          }
        },
      ],
      include: [/\.vue$/, /\.vue\?vue/],
      extensions: ['vue'],
    }),
    Layouts({
      defaultLayout: 'DefaultLayout',
    }),
  ],
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}/`,
    },
  },
})
