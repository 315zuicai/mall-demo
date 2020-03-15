<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contenScroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <good-list ref="recommend" :goods="recommend" />
    </scroll>
    <back-top v-show="isShowBackTop" @click.native="backClick" />
    <detail-bottom @addCart="addToCart" />
    <!-- <toast :message="message" :show="show" /> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottom from "./childComps/DetailBottom";
import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam
} from "network/detail";
import { debounce } from "common/utils";

import Scroll from "components/common/scroll/Scroll";
import GoodList from "components/content/goodList/GoodList";
// import Toast from "components/common/toast/Toast"

import { itemListenerMixin, backTopMixin } from "common/mixin";

// 把actions中的方法映射到methods中
import { mapActions } from 'vuex'

export default {
  name: "Detail",
  mixins: [itemListenerMixin, backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottom,

    Scroll,
    GoodList,
    // Toast,
  },
  data() {
    return {
      id: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      //  itemImgListener: null,
      themeTopYs: [],
      // getThemeTopY: null,
      currentIndex: 0,
      // show: false,
      // message: ''
    };
  },
  created() {
    // 1. 保存传入的iid
    this.id = this.$route.params.id;
    // console.log(this.$route.params);

    // 2.根据iid请求详情数据
    getDetail(this.id).then(res => {
      // console.log(res);
      const data = res.result;
      // 1.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages;
      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);
      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;
      // 5.保存商品参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 6.保存评论数据
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
      /*
      // 给 themeTopYs 赋值
      // 第一次获取，值不对
      // 值不对原因：this.$refs.params.$el压根没有渲染
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.themeTopYs);

      // 第二次获取，值不对
      // 值不对原因：图片没有计算在内
      this.$nextTick(() => {
        // 根据最新的数据，对应的DOM是已经渲染出来
        // 但是图片依然是没有加载完（目前获取到offsetTop不包含其中图片）
        // offsetTop值不对的时候，都是因为图片问题
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.themeTopYs);
      })
      */
    });

    // 3.获取推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommend = res.data.list;
    });

    // 4.给getThemeTopY赋值（对给this.themeTopYs赋值的操作进行防抖）
    // this.getThemeTopY = debounce(() => {
    //   this.themeTopYs = [];
    //   this.themeTopYs.push(0);
    //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    //   console.log(this.themeTopYs);
    // }, 200)
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();

      // 因为在子组件 DetailGoodsInfo中已经处理了，
      // 在图片都加载完毕后发送一次事件，所以此处不用防抖处理
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);

      // this.getThemeTopY();
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contenScroll(position) {
      // console.log(position);
      // 1.获取y值
      const positionY = -position.y;
      // 2.positionY和主题中值进行对比
      // [0, 6249, 6926, 7261, MAX_VAlUE]
      // positionY 在 0 和 6249之间， index = 0
      // positionY 在 6249 和 6926之间， index = 1
      // positionY 在 6926 和 7261间， index = 2
      // positionY 大于 6249， index = 3

      let length = this.themeTopYs.length;
      // 利用hack方式，末尾添加很大的值，然后在length-1的前提下(不越界),进行判断
      for (let i = 0; i < length - 1; i++) {
        // if(positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) {
        //   console.log(i);
        // }
        // if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
        //   this.currentIndex = i;
        //   this.$refs.nav.currentIndex = this.currentIndex;
        // }
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      // 判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;
      /*
       if (positionY > this.themeTopYs[0] && positionY < this.themeTopYs[1]) {
        this.$refs.nav.currentIndex = 0;
      }
      if (positionY >= this.themeTopYs[1] && positionY < this.themeTopYs[2]) {
        this.$refs.nav.currentIndex = 1;
      }
      if (positionY >= this.themeTopYs[2] && positionY < this.themeTopYs[3]) {
        this.$refs.nav.currentIndex = 2;
      }
      if (positionY >= this.themeTopYs[3]) {
        this.$refs.nav.currentIndex = 3;
      } 
      */
    },
    ...mapActions(['addCart']),
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.id = this.id;

      // 2.将商品加入购物车(1.Promise 2.mapActions)
      // this.$store.dispatch('addCart', product);
      this.addCart(product).then(res => {
        // console.log(res);
        // this.show = true;
        // this.message = res;

        // setTimeout(() => {
        //   this.show = false;
        //   this.message = ''
        // }, 1500)

        // console.log(this.$toast);
        
        this.$toast.show(res);
      })

    }
  },
  mounted() {
    // const refresh = debounce(this.$refs.scroll.refresh, 500);
    // this.itemImgListener = () => {
    //     refresh();
    //   }
    // this.$bus.$on('itemImageLoad', () => {
    //     refresh();
    //   });
  },
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  }
};
</script>

<style scoped>
#detail {
  /* 为父元素设置高度 */
  height: 100vh;
  position: relative;
  z-index: 9;
  background-color: #fff;
  /* overflow-y: hidden; */
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  /* 此处的100%是指的父元素，如果父元素没有设置高度，则指的是被元素们撑起来的高度，所以需要为父元素设置高度 */
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}

/* .content {
    position: absolute;
    top: 44px;
    bottom: 58px;
    left: 0;
    right: 0;
  } */
</style>
