import { createApp } from 'vue'
import {router} from './router/index'
import store from './store/index'
import App from './App.vue'
import VueParticles from 'vue-particles'

const app = createApp(App)

app.use(VueParticles)
app.use(router);
app.use(store)
app.mount('#app')



