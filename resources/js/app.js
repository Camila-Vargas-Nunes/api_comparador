import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';


import App from './components/App.vue';
import ExampleComponent from './components/ExampleComponent.vue';


const routes = [
    { path: '/', component: App },
    { path: '/example', component: ExampleComponent },
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});


const app = createApp(App);
app.use(router);
app.mount('#app');
