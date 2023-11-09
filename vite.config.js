import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// })

function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir)
}

export default ({ command, mode }) => {
  return {
    resolve: {
      alias: [
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
        {
          find: '@',
          replacement: pathResolve('src') + '/',
        },
      ],
      dedupe: ['vue'],
    },
    plugins: [vue()]
  }
}