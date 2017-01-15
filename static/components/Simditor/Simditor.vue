<template>
  <div class="hk-simditor">
    <textarea id="simditor" ref="simditor" autofocus></textarea>
  </div>
</template>

<script>
const CONSTANTS = {
  DEFAULT_OPTIONS: {
    toolbar: [ 'title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale',
      'color', 'ol', 'ul', 'blockquote', 'table', 'hr', 'indent', 'outdent', 'alignment' ]
  }
}
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
      ...CONSTANTS.DEFAULT_OPTIONS,
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
