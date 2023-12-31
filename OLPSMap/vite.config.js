import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
     proxy: { 
      '/axios': {
       target: "http://127.0.0.1:5000",
       changeOrigin: true,
       rewrite: (path) => path.replace(/^\/demo/, '')
      }
    }
})
