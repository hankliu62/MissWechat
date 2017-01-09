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

export default {
  data () {
    return {
      maskStyle: {},
      isLoading: false
    }
  },
  props: {
    isShowProgress: Boolean,
    acceptTypes: String
  },
  mounted () {
    if (this.$slots.default) {
      const slotDOM = this.$slots.default[0].elm;
      const width = ElementUtil.getElementStyle(slotDOM, 'width')
      const height = ElementUtil.getElementStyle(slotDOM, 'height')

      this.maskStyle = { width, height }
      const that = this

      const uploader = initUploader({
        browse_button: 'pickfiles',
        multi_selection: true,
        init: {
          FileUploaded: function (up, file, info, url) {
            that.$emit('onUploadedFile', url)
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
@import 'Upload.less';
</style>
