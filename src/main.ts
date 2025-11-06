import {createApp} from 'vue'
import './style.css'
import {createRouter, createWebHistory} from 'vue-router'
import App from './App.vue'
import About from './components/About.vue'
import Home from './components/Home.vue'
import Station from './components/Station.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', component: Home},
    {path: '/about', component: About},
    {path: '/station/:id', component: Station, props: true},
  ],
})

const app = createApp(App)
app.use(router)
app.mount('#app')
