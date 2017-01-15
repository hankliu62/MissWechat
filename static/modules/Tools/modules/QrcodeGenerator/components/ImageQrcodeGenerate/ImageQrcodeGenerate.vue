<template>
  <div class="text-qrcode-generater">
    <div class="image-upload-wrap">
      <upload title="Image Title" extensions="jpeg,jpg,png,gif" @onUploadedFile="onUploadedFile">
        <div class="image-content-wrap">
          <input class="hk-input image-name" placeholder="请选择图片" v-model="image.key" disabled/>
          <div class="btn hk-btn btn-theme btn-upload-image">上传本地图片</div>
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
  </div>
</template>

<script>
import { PARAM_TYPES } from '../../constants/constants'
import ToggleEditor from '../ToggleEditor/ToggleEditor'
import Upload from '../../../../../../components/Upload/Upload'

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
    }
  },
  components: { ToggleEditor, Upload }
}
</script>

<style scoped lang="less">
@import './ImageQrcodeGenerate';
</style>
