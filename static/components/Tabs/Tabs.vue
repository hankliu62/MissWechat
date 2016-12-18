<template>
<div class="tabbable">
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
    value: {}
  }
}
</script>

<style lang="less">
@import './Tabs';
</style>
