<template>
  <div :class="['loading-mask', { hidden: !isShow }]">
    <img class="icon-loading" src="./images/loading.gif" />
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="less">
@import './Loading';
</style>
