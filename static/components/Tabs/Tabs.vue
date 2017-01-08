<template>
<div :class="['tabbable', type]">
  <slot name="tablist"></slot>
  <slot name="tabpanel"></slot>
</div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    value: {},
    type: {
      type: String,
      default: 'card'
    }
  }
}
</script>

<style lang="less">
@import './Tabs';
</style>
