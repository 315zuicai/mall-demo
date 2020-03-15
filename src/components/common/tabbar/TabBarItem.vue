<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
    <!-- <img src="../../assets/img/tabbar/home.svg" />
    <div>首页</div> -->
  </div>
</template>

<script>
export default {
  name: "TabBatItem",
  props:{
    path: String,
    activeColor: {
      type: String,
      default: '#ff5777'
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  data() {
    return {
      // isActive: true,
      // path: '/home'
    }
  },
  methods: {
    itemClick() {
      this.$router.push(this.path)
    }
  },
};
</script>

<style scoped>
.tab-bar-item {
  /* flex: 1px; */
  flex-grow: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}

/* .active {
  color: red;
} */
</style>