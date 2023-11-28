import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createRouter,createWebHashHistory } from "vue-router";
import HelloWorldVue from './components/HelloWorld.vue'
import Vue3BaiduMapGL from 'vue3-baidu-map-gl'


const routes = [
    { path: '/', component: HelloWorldVue }
  ]
  
  const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
  })

createApp(App).use(ElementPlus).use(router).use(Vue3BaiduMapGL,{ak:'mXxsHCRD6m21QBfmG1uhGj8LM0xba2tp',  plugins: ['TrackAnimation']}).mount('#app')
