<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      class="tab-control-up"
      v-show="isTabFixed"
      @tabClick="tabClick"
      ref="tabControl1"
    />
    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperItemLoad="swiperItemLoad" />
      <recommend-view :recommends="recommends" />
      <feature />
      <tab-control
        :titles="['流行', '新款', '精选']"
        class="tab-control"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <good-list :goods="showGoods"></good-list>
    </scroll>
    <!-- 使用.native修饰符才可以监听组件的点击事件 -->
    <back-top v-show="isShowBackTop" @click.native="backClick" />
  </div>
</template>


<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import Feature from "./childComps/Feature";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodList from "components/content/goodList/GoodList";
import Scroll from "components/common/scroll/Scroll";
// import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";
import { itemListenerMixin, backTopMixin } from "common/mixin";

export default {
  name: "Home",
  mixins: [itemListenerMixin, backTopMixin],
  components: {
    HomeSwiper,
    RecommendView,
    Feature,

    TabControl,
    NavBar,
    GoodList,
    Scroll
    // BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      // 请求多组数据，采用才数据结构
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      // 当前的类型
      currentType: "pop",
      // 默认回到顶层按钮不显示
      // isShowBackTop: false,
      taboffsetTop: 0,
      isTabFixed: false,
      saveY: 0
      // itemImgListener: null,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  destroyed() {
    // console.log('home-destroyed')
  },
  activated() {
    // console.log('activated');

    this.$refs.scroll.scrollTo(0, this.saveY, 2000);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // console.log('deactivated');
    // 1.保存Y值
    this.saveY = this.$refs.scroll.getScrollY();
    // console.log(this.saveY);
    // 2.取消全局事件的监听，除了事件，还需要传入要取消的函数，否则所有事件都会被取消
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  created() {
    // 方便created处易读，将网络请求封装到methods

    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.请求首页商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");

    // 当加载完图片后重新计算高度，因为一开始按照没有图片高度计算，高度不够滚动
    // 事件总线的方式，$bus定义给vue原型，同时$bus是一个vue实例
    // 最好不要再created里面做监听，可能拿不到$refs,在mounted中做。
    // this.$bus.$on('itemImageLoad', () => {
    //     console.log('--------');
    //     // this.$refs.scroll.scroll.refresh();
    //     this.$refs.scroll.refresh();
    //   });
  },
  mounted() {
    // 1.图片加载完成的事件监听
    // 在$on之前定义一个变量，接受debounce函数的返回值。一个新生成的函数
    // 如果不传入delay=500，根据js事件循环，setTimeout依旧放在后面
    // const refresh = this.debounce(this.$refs.scroll.refresh, 500);
    // 抽离后直接用debounce不用this
    // 利用混入，所以注释掉 下面五行，和下面12 13行
    // const refresh = debounce(this.$refs.scroll.refresh, 500);
    // this.itemImgListener = () => {
    //     refresh();
    //   }
    // this.$bus.$on('itemImageLoad', () => {
    // console.log('--------');
    // this.$refs.scroll.scroll.refresh();
    // 对refresh()做一层防抖函数包装，否则调用太多次的refresh。
    // this.$refs.scroll.refresh();
    // 此时调用不再频繁
    //   refresh();
    // });
    // 2.获取tabControl的offsetTop
    // 所有的组件都有一个属性 $el: 用于获取组件中的元素  拿到组件的根组件
    // 但是此时只是挂载完毕，图片还未加载，所以拿到的offsetTop比较小
    // console.log(this.$refs.tabControl.$el.offsetTop);
  },
  methods: {
    /**
     * 事件请求函数
     */

    // 防抖函数 为了在其他页面也使用，抽离出去——>common中
    // debounce(func, delay) {
    //   let timer = null;
    //   return function(...args) {
    //     if (timer) clearTimeout(timer);
    //     timer = setTimeout(() => {
    //       func.apply(this, args)
    //     }, delay)
    //   }
    // },

    // 监听tabControlBar的点击事件
    tabClick(index) {
      switch (index) {
        case 0: {
          this.currentType = "pop";
          break;
        }
        case 1: {
          this.currentType = "new";
          break;
        }
        case 2: {
          this.currentType = "sell";
          break;
        }
      }
      // 此处设置两个tabControl内部的属性currentIndex为现在点击的index，保持两者被点击时一致
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 子传父，触发此方法，判断滚动位置
    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.isShowBackTop = -position.y >= 1000;

      // 2.决定tabControl是否吸顶(position：fixed)
      this.isTabFixed = -position.y > this.taboffsetTop;
    },
    // 监听置顶按钮的点击  抽取至混入
    /*  backClick() {
      // 父组件访问子组件的某个方法
      this.$refs.scroll.scrollTo(0, 0);
    },
  */
    // 加载更多
    loadMore() {
      // console.log('上拉加载更多');
      this.getHomeGoods(this.currentType);
      // 当加载完图片后重新计算高度，因为一开始按照没有图片高度计算，高度不够滚动
      // this.$refs.scroll.scroll.refresh();
    },
    // 轮播图图片请求成功后，获取tabbar的offsetTop
    swiperItemLoad() {
      this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /**
     * 封装的网络请求函数
     */
    getHomeMultidata() {
      // 不用写return
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    // 请求不同种类的商品 流行 新款 精选
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      // 此处的函数是，导入的网络请求的函数，上面的函数是Home.vue中定义的一个封装函数
      getHomeGoods(type, page).then(res => {
        // 使用[]访问goods的键
        this.goods[type].list.push(...res.data.list); //ES6中的扩展运算符，将数据存入list
        this.goods[type].page += 1;

        // 请求完货物，当上拉加载数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;

  /* 因为原来使用的是js原生的办法，所以需要fixed，但是现在BS，已经设置了高度，所以不在需要脱标 */
  /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
/* 引入better-scroll后失效 */
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */
.tab-control-up {
  position: relative;
  z-index: 9;
  top: -2px;
}

.content {
  overflow: hidden;

  position: absolute;
  top: 43px;
  bottom: 49px;
  left: 0px;
  right: 0px;
  /* background-color: #fff; */
}
/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */

/* 因为betterScroll使用时，源码是修改transform中的translate所以fixed无法固定，会被滚上去 */
/* .fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
} */
</style>