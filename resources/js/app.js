import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';


import App from './components/App.vue';
import Simulador from './components/Simulador.vue';


const routes = [
    { path: '/', component: Simulador },
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});


const app = createApp(App);
app.use(router);
app.mount('#app');
