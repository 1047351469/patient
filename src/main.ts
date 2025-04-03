import "@/regex/test1"
// import "@/regextest1"
import { createApp } from 'vue'
import 'vant/lib/index.css'
import "@/styles/main.scss"
import App from './App.vue'
import router from './router'
import pinia from './stores'
import Vant from 'vant';
import 'virtual:svg-icons-register'
import 'vant/es/toast/style';
const app = createApp(App)



app.use(pinia)
app.use(router)
app.use(Vant);
app.mount('#app')
