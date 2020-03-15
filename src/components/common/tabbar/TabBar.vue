<template>
  <div id="tab-bar">
    <slot></slot>      
  </div>  
</template>

<script>
export default {
  name: 'TabBar',

}
</script>

<style scoped>

  #tab-bar {
    display: flex;
    background-color: #f6f6f6;  

    
    position: fixed;
    left: 0px;
    bottom: 0px;
    right: 0px;

    box-shadow: 0px -1px 1px rgba(150,150,150,0.8);
  }

</style>