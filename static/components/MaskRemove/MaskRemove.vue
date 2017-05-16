<template>
  <i class="icon icon-close remove" @click.stop.prevent.self="onRemove" />
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    onRemove () {
      this.$emit('onRemove')
    }
  }
}
</script>

<style scoped lang="less">
@import './MaskRemove';
</style>
