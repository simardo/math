import './polyfills';
import Vue from 'vue';
import router from './router';
import axios from 'axios';

Vue.config.productionTip = false;

(Vue.prototype as any).$http = axios;

const vue = new Vue({
    router,
    template: '<router-view></router-view>'
});

vue.$mount('#vue');
