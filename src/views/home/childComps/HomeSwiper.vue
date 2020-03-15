<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners">
        <!-- 使用v-bind才会认为是一个变量 -->
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imagLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'
  export default {
    name: 'HomeSwiper',
    props: {
      banners: {
        type: Array,
        // 类型是对象或者数组时，默认值必须是一个函数
        defult() {
          return []
        }
      }
    },
    data() {
      return {
        isLoad: false,
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imagLoad() {
        // 设置一个变量isLoad，可以防止触发事件四次，一次就够了
        if(!this.isLoad) {
          this.$emit('swiperItemLoad');
          this.isLoad = true;
        }
        
      }
    },
  }
</script>

<style scoped>

</style>