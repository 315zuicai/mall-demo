<template>
  <div class="goods-list">
    <good-list-item v-for="(item, index) in goods" :goods-item="item" class="item" :key="index" />
  </div>
</template>

<script>
import GoodListItem from "./GoodListItem"

export default {
  name: 'GoodList',
  components: {
    GoodListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    justify-content: space-around;
  }

  .goods-list .item {
    width: 48%;
  }
</style>