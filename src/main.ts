import { createApp } from 'vue'
import {router} from './router/index'
import Vuex from 'vuex'
import store from './store/index'
import App from './App.vue'


const app = createApp(App)

app.use(router);
app.use(store)
app.mount('#app')



