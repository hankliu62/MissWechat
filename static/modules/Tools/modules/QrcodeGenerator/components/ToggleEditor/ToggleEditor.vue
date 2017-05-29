<template>
  <div class="toggle-editor-wrap">
    <i
      :class="['icon icon-2x', { 'icon-angle-up': isShowEditor, 'icon-angle-down': !isShowEditor }]"
      @click.stop.prevent.self="onToggleEditor">
    </i>
    <textarea
      class="form-control hk-text"
      placeholder="请输入文字内容"
      ref="text"
      v-model="value"
      v-show="!isShowEditor"
      @change="onChangeText">
    </textarea>
    <simditor
      :content="html"
      :options="simditorOptions"
      v-show="isShowEditor"
      @editorblur="onChangeHtml" />
  </div>
</template>

<script>
import autosize from 'autosize';
import Simditor from '../../../../../../components/Simditor/Simditor'

export default {
  data () {
    this.simditorOptions = {
      placeholder: '请输入文字内容'
    }

    return {
      value: '',
      html: ''
    }
  },
  props: {
    content: Object,
    isShowEditor: Boolean
  },
  mounted () {
    if (this.$refs.text) {
      autosize(this.$refs.text);
    }
  },
  methods: {
    onToggleEditor () {
      this.$emit('onToggleIsShowEditor')
    },
    onChangeText (event) {
      this.value = event.target.value
      this.$emit('onChangeText', this.value)
    },
    onChangeHtml (html) {
      this.html = html
      this.$emit('onChangeHtml', this.html)
    }
  },
  watch: {
    content (newValue) {
      this.value = newValue ? newValue.text || '' : ''
      this.html = newValue ? newValue.html || '' : ''
    }
  },
  components: { Simditor }
}
</script>

<style scoped lang="less">
@import './ToggleEditor';
</style>
