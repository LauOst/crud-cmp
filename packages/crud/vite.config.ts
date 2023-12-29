import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import dts from 'vite-plugin-dts'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), VueSetupExtend(), dts({ insertTypesEntry: true, copyDtsFiles: false })],
  build: {
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Crud',
      fileName: 'crud',
    },
  },
})
