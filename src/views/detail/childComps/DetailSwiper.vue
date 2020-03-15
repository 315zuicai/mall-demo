<template>
<div>
  <swiper v-if="topImages.length>0" class="detail-swiper">
    <swiper-item v-for="image in topImages" :key="image">
      <img :src="image" alt="">
    </swiper-item>
  </swiper>
</div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name:'DetailSwiper',
  components: {
    Swiper, 
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data(){
   return {

   }
  }
}
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>
