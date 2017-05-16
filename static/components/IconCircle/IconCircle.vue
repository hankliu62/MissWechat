<template>
  <i :class="`hk-fa fa fa-${type}-circle`"></i>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    type: {
      type: String,
      default: 'question'
    }
  }
}
</script>

<style scoped lang="less">
@import './IconCircle';
</style>
