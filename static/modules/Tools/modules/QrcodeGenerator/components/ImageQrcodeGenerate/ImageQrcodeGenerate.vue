<template>
  <div class="image-qrcode-generater">
    <div class="image-upload-wrap">
      <upload titles="Image files" extensions="jpeg,jpg,png,gif" @onUploadedFile="onUploadedFile">
        <div class="image-content-wrap">
          <input class="hk-input image-name" placeholder="请选择上传的图片" v-model="image.key" disabled/>
          <div class="btn hk-btn btn-theme btn-upload-image" v-text="btnText"></div>
        </div>
      </upload>
    </div>
    <toggle-editor
      :content="content"
      :isShowEditor="isShowEditor"
      @onChangeText="onChangeText"
      @onChangeHtml="onChangeHtml"
      @onToggleIsShowEditor="onToggleIsShowEditor">
    </toggle-editor>
    <div class="upload-tips">
      <info-tip type="question" content="支持图片格式">
        <span slot="tip">jpg,jpeg,gif,png</span>
      </info-tip>
    </div>
  </div>
</template>

<script>
import { PARAM_TYPES } from '../../constants/constants'
import ToggleEditor from '../ToggleEditor/ToggleEditor'
import Upload from '../../../../../../components/Upload/Upload'
import InfoTip from '../../../../../../components/InfoTip/InfoTip'

const CONSTANTS = {
  DEFAULT_IMAGE_CONTENT: {
    image: {
      key: '',
      url: ''
    },
    content: {
      text: '',
      html: ''
    }
  }
}

const getImageContent = function (vm) {
  const qrcodeContent = vm.qrcodeContent || {}
  const imageContent = qrcodeContent[PARAM_TYPES.IMAGE] ? qrcodeContent[PARAM_TYPES.IMAGE] : CONSTANTS.DEFAULT_IMAGE_CONTENT
  return imageContent
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
      const imageContent = getImageContent(this)
      const qrcodeContent = {
        ...(this.qrcodeContent || {}),
        [PARAM_TYPES.IMAGE]: {
          image: imageContent.image,
          content: { text, html: imageContent.content.html }
        }
      }
      this.$emit('onChangeContent', qrcodeContent)
    },
    onChangeHtml (html) {
      const imageContent = getImageContent(this)
      const qrcodeContent = {
        ...(this.qrcodeContent || {}),
        [PARAM_TYPES.IMAGE]: {
          image: imageContent.image,
          content: { text: imageContent.content.text, html }
        }
      }
      this.$emit('onChangeContent', qrcodeContent)
    },
    onUploadedFile (url, key) {
      const imageContent = getImageContent(this)
      const qrcodeContent = {
        ...(this.qrcodeContent || {}),
        [PARAM_TYPES.IMAGE]: {
          image: { url, key },
          content: imageContent.content
        }
      }
      this.$emit('onChangeContent', qrcodeContent)
    }
  },
  computed: {
    content () {
      const imageContent = getImageContent(this)
      return { ...imageContent.content }
    },
    image () {
      const imageContent = getImageContent(this)
      return imageContent.image
    },
    btnText () {
      const imageContent = getImageContent(this)
      return imageContent.image && imageContent.image.url ? '重新上传' : '上传本地图片'
    }
  },
  components: { ToggleEditor, Upload, InfoTip }
}
</script>

<style scoped lang="less">
@import './ImageQrcodeGenerate';
</style>
