import { createApp } from 'vue'
import  store  from './store'
import App from './App.vue'
import components from './UI/index'

const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component)
}); //рабочая регистрация UI

app
    .use(store)
    .mount('#app');
