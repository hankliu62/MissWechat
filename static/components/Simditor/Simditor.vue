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
    },
    content: String
  },
  computed: {
    content (newValue) {
      this.editor.setValue(newValue)
    }
  },
  mounted () {
    this.editor = new Simditor({
      textarea: this.$refs.simditor,
      ...this.options
    });

    this.editor.on('valuechanged', () => this.$emit('valuechanged', this.editor.getValue()))
  },
  destroyed () {
    if (this.editor) {
      this.editor.destroy()
    }
  }
}
</script>

<style lang="less">
@import './Simditor';
</style>
