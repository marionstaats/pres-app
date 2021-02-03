import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueFormulate from '@braid/vue-formulate'
import './assets/css/main.css';
import './assets/css/formulate.css';

Vue.use(VueFormulate)

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')