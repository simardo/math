import './polyfills';
import Vue from 'vue';
import router from './router';
import Button from '@ulaval/modul-components/dist/components/button/button';
import TextField from '@ulaval/modul-components/dist/components/textfield/textfield';
import i18n, { currentLang, FRENCH } from '@ulaval/modul-components/dist/utils/i18n/i18n';
import fr from '@ulaval/modul-components/dist/lang/fr';

Vue.config.productionTip = false;

Vue.use(i18n);
currentLang(FRENCH);
Vue.use(Button);
Vue.use(TextField);
Vue.use(fr);

const vue = new Vue({
    router,
    template: '<router-view></router-view>'
});

vue.$mount('#vue');
