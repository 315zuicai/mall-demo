import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-type';

export default {
  // mutations唯一的目的就是修改state中状态
  // mutations中的每个方法尽可能完成的事件比较单一一点
  // 因为单一才会便于在调试工具中追踪每一步的行为
 /* addCart(state, payload) {
    // payload新添加的商品

    // let oldProduct = null;
    // 1.查找之前数组中是否有该商品
    // for (let item of state.cartList) {
    //   if (payload.id === item.id) {
    //     oldProduct = item;
    //   }
    // }

    // 1.查找之前数组中是否有该商品
    let oldProduct = state.cartList.find(item => item.id === payload.id);

    // 2.判断oldProduct
    if (oldProduct) {
      oldProduct.count += 1;
    } else {
      payload.count = 1;
      state.cartList.push(payload);
    }
  } */
  [ADD_COUNTER](state, payload) {
    payload.count++;
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true;
    state.cartList.push(payload);
  }
};