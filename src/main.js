import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import request from './untils/request';
import {
  Layout,
  Icon,
  Menu,
  Breadcrumb,
  Button,
  Tag,
  Pagination,
  Skeleton,
  Empty,
  Spin,
  ConfigProvider,
} from 'ant-design-vue';
Vue.config.productionTip = false;

Vue.use(Layout);
Vue.use(Icon);
Vue.use(Menu);
Vue.use(Breadcrumb);
Vue.use(Button);
Vue.use(Tag);
Vue.use(Pagination);
Vue.use(Skeleton);
Vue.use(Empty);
Vue.use(Spin);
Vue.use(ConfigProvider);

Vue.prototype.$request = request;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
