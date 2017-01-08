<template>
  <div :class="['hk-loading-mask', customClass, { 'is-fullscreen': fullscreen }]">
    <div class="el-loading-spinner">
      <img class="el-loading-icon" src="./images/loading.gif" />
      <div :class="['el-loading-text', { hidden: !text }]" v-text="text"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fullscreen: true,
      customClass: '',
      text: ''
    };
  }
}
</script>

<style scoped lang="less">
@import './Loading';
</style>
