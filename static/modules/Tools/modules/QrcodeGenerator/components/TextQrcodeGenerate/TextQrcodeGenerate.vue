<template>
  <div class="text-qrcode-generater">
    <toggle-editor
      :content="content"
      :isShowEditor="isShowEditor"
      @onChangeText="onChangeText"
      @onChangeHtml="onChangeHtml"
      @onToggleIsShowEditor="onToggleIsShowEditor">
    </toggle-editor>
  </div>
</template>

<script>
import { PARAM_TYPES } from '../../constants/constants'
import ToggleEditor from '../ToggleEditor/ToggleEditor'

const CONSTANTS = {
  DEFAULT_TEXT_CONTENT: {
    text: '',
    html: ''
  }
}

const getTextContent = function (vm) {
  const qrcodeContent = vm.qrcodeContent || {}
  const textContent = qrcodeContent[PARAM_TYPES.TEXT] ? qrcodeContent[PARAM_TYPES.TEXT] : CONSTANTS.DEFAULT_TEXT_CONTENT
  return textContent
}

export default {
  data () {
    return {}
  },
  props: {
    qrcodeContent: Object,
    isShowEditor: Boolean
  },
  methods: {
    onToggleIsShowEditor () {
      this.$emit('onToggleIsShowEditor')
    },
    onChangeText (text) {
      const textContent = getTextContent(this)
      const qrcodeContent = {
        ...(this.qrcodeContent || {}),
        [PARAM_TYPES.TEXT]: { text, html: textContent.html }
      }
      this.$emit('onChangeContent', qrcodeContent)
    },
    onChangeHtml (html) {
      const textContent = getTextContent(this)
      const qrcodeContent = {
        ...(this.qrcodeContent || {}),
        [PARAM_TYPES.TEXT]: { text: textContent.text, html }
      }
      this.$emit('onChangeContent', qrcodeContent)
    }
  },
  computed: {
    content () {
      const textContent = getTextContent(this)
      return { ...textContent }
    }
  },
  components: { ToggleEditor }
}
</script>

<style scoped lang="less">
@import './TextQrcodeGenerate';
</style>
