import Vue from 'vue';
import App from './App.vue';
import router from './router';  //最后是一个目录，会自动寻找目录下的index文件，所以可以省略
import store from './store';
import toast from 'components/common/toast';
import VueLazyLoad from 'vue-lazyload';

Vue.config.productionTip = false;

// 添加时间总线对象
Vue.prototype.$bus = new Vue();
// 安装toast插件
Vue.use(toast);

// 使用懒加载插件
Vue.use(VueLazyLoad, {
  // require导入图片
  loading: require('./assets/img/common/placeholder.png')
});


new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');

// git test
// git test
// git test
// git test
// git test
// git test
// git test
// git test
// git test
// git test