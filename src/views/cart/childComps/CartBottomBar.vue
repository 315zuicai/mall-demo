<template>
  <div class="bottom-menu">
    <check-button class="select-all" :isChecked="isSelectAll" @click.native="checkClick" />
    <span>全选</span>
    <span class="total-price">合计：￥{{totalPrice}}</span>
    <span class="buy-product" @click="calcClick">去计算({{cartLength}})</span>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["cartList", "cartLength"]),
    totalPrice() {
      const cartList = this.cartList;
      return cartList
        .filter(item => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.price * item.count;
        }, 0)
        .toFixed(2);
    },
    // 判断所有物品选中时，全选按钮被点亮
    isSelectAll() {
      if (this.cartList.length === 0) return false;
      // 1.使用filter
      // return !(this.cartList.filter(item => !item.checked).length)

      // 2.使用find
      // return !this.cartList.find(item => !item.checked)

      // 3.使用普通遍历
      for (let item of this.cartList) {
        if (item.checked === false) {
          return false;
        }
      }
      return true;
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        //如果全部被选中
        this.cartList.forEach(item => (item.checked = false));
      } else {
        //部分或全部不选中
        this.cartList.forEach(item => (item.checked = true));
      }

      // 下面这行代码是不行的，必须给确定的值 true/false
      // 此代码会和 isSelectAll 共通作用 导致混乱
      //this.cartList.forEach(item => item.checked = !this.isSelectAll)
    },
    calcClick() {
      // 如果购物车为空
      let len = this.cartList.filter(item => item.checked).length;
      if (this.cartList.length === 0) {
        this.$toast.show("购物车为空", 2000);
      } else if (len == 0) {
        //不加else依旧只会提醒请选择购买的商品
        // 全部不选中时，提示请选择购买的商品
        // 有问题的做法
        // if (!this.isSelectAll) {
        //   this.$toast.show("请选择购买的商品", 2000);
        // }

        //正确做法
        // 被选中的个数

        // 被选中的个数和购物车的数量

        this.$toast.show("请选择购买的商品", 2000);
      } else {
        this.$toast.show("功能尚待开发", 2000);
      }
    }
  }
};
</script>

<style scoped>
.bottom-menu {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 49px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}
.bottom-menu .select-all {
  position: absolute;
  /* 设置为0，就是原来的大小，要不会撑开 */
  line-height: 0;
  left: 12px;
  top: 13px;
}
.bottom-menu .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}

.bottom-menu .buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  line-height: 44px;
  float: right;
  text-align: center;
}
</style>
