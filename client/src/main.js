import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Vue from 'vue';
import App from './App.vue';
import store from './store/index';
import router from './router';


Vue.use(Vuetify, {
  theme: {
    primary: '#2458A0',
    secondary: '#FFA726',
    accent: '#8A8D8F',
    error: '#f44336',
    warning: '#faece4',
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
