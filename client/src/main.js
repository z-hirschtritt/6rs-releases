import ElementUI from 'element-ui';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import locale from 'element-ui/lib/locale/lang/en';
import Vue from 'vue';
import App from './App.vue';
import store from './store/index';
import router from './router';

Vue.use(ElementUI, { locale });
Vue.use(Vuetify, {
  theme: {
    primary: '#009688',
    secondary: '#FFA726',
    accent: '#D81B60',
    error: '#f44336',
    warning: '#ffeb3b',
    info: '#2196f3',
    success: '#4caf50',
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
