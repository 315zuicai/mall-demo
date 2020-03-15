<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  // 组件创建完后调用，但是还没有挂载模板，拿不到this.$refs.wrapper,所以要放到mounted中。
  created() {
  },
  mounted() {
    // 1.创建BScroll对象
    // 此处给元素添加ref属性，然后采用$refs引用
    // 可以避免document.querySelectory()选择元素时产生歧义
    this.scroll = new BScroll(this.$refs.wrapper, {
      // click选项用于使能scroll中的点击事件
      click: true,
      // probeType选项用于使用scroll中的滚动位置相关事件
      probeType: this.probeType,
      // pullUpLoad选项用于做上拉加载功能
      pullUpLoad: this.pullUpLoad,
    });

    // 打印一下scroll对象，看看其属性有什么
    // console.log(this.scroll);

    // 2.监听滚动的位置
    // 多一步if判断更加严谨
    if(this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        // console.log(position);
        this.$emit("scroll", position);
      });
    }

    // 3.监听scroll滚动到底部
    if(this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // console.log('上拉加载更多');
        this.$emit("pullingUp");
      });
    }

  },
  methods: {
    scrollTo(x, y, time = 300) {
      // 确保有scroll对象
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      // 确保有scroll对象
      this.scroll && this.scroll.refresh();
      // console.log('----');
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    }
  }
};
</script>

<style scoped>
</style>