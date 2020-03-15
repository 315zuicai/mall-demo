<template>
  <div class="icon-selector" :class="{checked: isChecked}">
    <img src="~assets/img/cart/tick.svg"  />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {

    };
  }
};
</script>

<style scoped>
.icon-selector {
  /* position: relative;
    margin: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer; */

  border-radius: 50%;
  border: 2px solid #aaa;
  cursor: pointer;
}

.checked {
  border-color: #ff8198;
  background-color: #ff8198;
}
</style>
