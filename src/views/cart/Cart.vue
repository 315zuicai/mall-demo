<template>
  <div>
    <!-- 导航 -->
    <nav-bar class="nav-bar"><div slot="center">购物车({{length}})</div></nav-bar>

    <!-- 商品的列表 -->
    <cart-list />

    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>


<script>
import NavBar from 'components/common/navbar/NavBar';

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar';


// 从vuex中导入
// 将getters映射到computed
import { mapGetters } from 'vuex';

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // 两种语法
    // ...mapGetters([
    //   'cartLength',
    //   'cartList'
    // ])
    // 取另外的名字
    ...mapGetters({
      length: 'cartLength',
    })
  },

}
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>