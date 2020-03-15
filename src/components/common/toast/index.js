import Toast from './Toast.vue';

const obj = {};

obj.install = function (Vue) {
  // 1.创建组件构造器
  const toastCoustructor = Vue.extend(Toast);

  // 2.new的方式，根据组件构造器，创建出来一个新的组件对象
  const toast = new toastCoustructor();

  // 3.将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'));

  // 4.toast.$el 对应的就是div
  document.body.appendChild(toast.$el);

  Vue.prototype.$toast = toast;
};

export default obj;