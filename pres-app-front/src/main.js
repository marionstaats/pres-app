import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueFormulate from '@braid/vue-formulate'
import Autocomplete from './assets/js/autocomplete'
import { fr } from '@braid/vue-formulate-i18n'
import './assets/css/main.css';
import './assets/css/formulate.css';

Vue.use(VueFormulate, {
    plugins: [Autocomplete, fr],
    locale: 'fr'
})

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')