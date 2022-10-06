import { HeadlessUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  vite: {
    plugins: [
      Components({
        resolvers: [
          HeadlessUiResolver({}),
          name => {
            if (name.includes('IconSolid')) {
              const realName = name.split('Solid')[0]
              return { importName: 'default', path: `@heroicons/vue/24/solid/esm/${realName}.js` }
            }
            if (name.includes('IconOutline')) {
              const realName = name.split('Outline')[0]
              return { importName: 'default', path: `@heroicons/vue/24/outline/esm/${realName}.js` }
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
    ],
  },
  build: {
    transpile: [
      '@heroicons/vue',
      '@headlessui/vue',
      // 'v-calendar',
      // 'vue-toastification',
    ],
  },
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    // {
    //   autoImports: [
    //     // automatically imports `defineStore`
    //     'defineStore', // import { defineStore } from 'pinia'
    //     // automatically imports `defineStore` as `definePiniaStore`
    //     ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    //   ],
    // },
  ],
  plugins: [
    { src: '~/plugins/nuxtServerInit.server.ts' }, // must be the first server plugin
  ],

})
