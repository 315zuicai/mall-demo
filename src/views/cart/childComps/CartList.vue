<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item 
      v-for="(item, index) in cartList" 
      :key="index" 
      :itemInfo='item' />
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Scroll from "components/common/scroll/Scroll";


import CartListItem from './CartListItem';

export default {
  name: "CartList",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["cartList"])
  },
  components: {
    Scroll,
    CartListItem,
  },
  activated() {
    // 打开购物车时，刷新scroll的滚动高度
    this.$refs.scroll.refresh()
  },
};
</script>

<style scoped>
.cart-list {
  height: calc(100vh - 44px - 49px - 44px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>
