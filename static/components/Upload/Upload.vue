<template>
  <div id="uploadcontainer" class="file-upload">
    <div id="pickfiles" class="upload-presentation-layer">
      <slot></slot>
    </div>
    <div class="upload-progress" v-if="isShowProgress" v-show="isLoading"></div>
  </div>
</template>

<script>
import { initUploader } from '../../utils/QiniuUtil'
import ElementUtil from '../../utils/ElementUtil'

const CONSTANTS = {
  MAX_FILE_SIZE: '5mb'
}

export default {
  data () {
    return {
      maskStyle: {},
      isLoading: false
    }
  },
  props: {
    isShowProgress: Boolean,
    acceptTypes: String,
    maxFileSize: Number,
    title: String,
    extensions: String
  },
  mounted () {
    if (this.$slots.default) {
      const slotDOM = this.$slots.default[0].elm;
      const width = ElementUtil.getElementStyle(slotDOM, 'width')
      const height = ElementUtil.getElementStyle(slotDOM, 'height')

      this.maskStyle = { width, height }
      const that = this

      const filters = {
        max_file_size: this.maxFileSize || CONSTANTS.MAX_FILE_SIZE
      }

      if (this.title && this.extensions) {
        filters.mime_types = [{ title: this.title, extensions: this.extensions }]
      }

      const init = {
        FileUploaded: function (uploader, file, info, url) {
          console.log(url)
          that.$emit('onUploadedFile', url)
        },
        Error: function (uploader, err, errTip) {
          console.log({ uploader, err, errTip })
        }
      }

      const uploader = initUploader({
        browse_button: 'pickfiles',
        multi_selection: false,
        filters,
        init
      })
    }
  }
}
</script>

<style scoped lang="less">
@import 'Upload.less';
</style>
