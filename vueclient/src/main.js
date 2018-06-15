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
Vue.use(Vuetify);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

Vue.mixin({
  beforeCreate() {
    const { sync } = this.$options;
    if (sync) {
      if (!this.$options.computed) {
        this.$options.computed = {};
      }
      const attrs = Object.keys(this.$attrs);
      sync.forEach((key) => {
        if (!attrs.includes(key)) {
          Vue.util.warn(`Missing required sync-prop: "${key}"`, this);
        }
        this.$options.computed[key] = {
          get() {
            return this.$attrs[key];
          },
          set(val) {
            this.$emit(`update:${key}`, val);
          },
        };
      });
    }
  },
});
