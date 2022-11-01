import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store  from './store';
import axios from 'axios'

const app = createApp(App)

app.use(router)
app.use(store);

axios.defaults.headers.common['Authorization'] = store.state.token;

app.mount('#app')
