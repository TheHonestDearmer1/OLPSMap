import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
     proxy: { 
      '/demo': {
       target: "https://api.map.baidu.com/directionlite/v1/driving",
       changeOrigin: true,
       rewrite: (path) => path.replace(/^\/demo/, '')
      }
    }
})
