import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router'
import './tailwind.css'
import App from './App.vue'
// import { routes } from './routes.js'
// import { createRouter, createWebHistory } from 'vue-router'


// import { fakeBackend } from './helpers';
// fakeBackend();

const pinia = createPinia()
const app = createApp(App)

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// })

app.use(router)
app.use(pinia)
app.mount('#app')
