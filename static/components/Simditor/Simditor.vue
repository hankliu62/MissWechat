<template>
  <div class="hk-simditor">
    <textarea id="simditor" ref="simditor" autofocus></textarea>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    options: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  mounted () {
    const editor = new window.Simditor({
      textarea: this.$refs.simditor,
      ...this.options
    });
  }
}
</script>

<style lang="less">
@import './Simditor';
@import '../../styles/components/hk-simditor';
</style>
