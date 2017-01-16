<template>
  <div id="uploadcontainer" class="file-upload">
    <div :id="id" class="upload-presentation-layer">
      <slot></slot>
    </div>
    <div class="upload-progress" v-if="isShowProgress" v-show="isLoading"></div>
  </div>
</template>

<script>
import { initUploader } from '../../utils/QiniuUtil'
import ElementUtil from '../../utils/ElementUtil'
import { showLoading } from '../../utils/LoadingUtil'
import ArrayUtil from '../../utils/ArrayUtil'

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
    id: {
      type: String,
      default: function () {
        return `pickfiles-${new Date().valueOf()}`
      }
    },
    isShowProgress: Boolean,
    isShowLoading: {
      type: Boolean,
      default: true
    },
    maxFileSize: Number,
    titles: String,
    extensions: String
  },
  mounted () {
    if (this.$slots.default) {
      this.isInited = true
      const slotDOM = this.$slots.default[0].elm;
      const width = ElementUtil.getElementStyle(slotDOM, 'width')
      const height = ElementUtil.getElementStyle(slotDOM, 'height')

      this.maskStyle = { width, height }
      const that = this

      const filters = {
        max_file_size: this.maxFileSize || CONSTANTS.MAX_FILE_SIZE
      }

      if (this.titles && this.extensions) {
        if (ArrayUtil.isArray(this.titles)) {
          filters.mime_types = []
          for (const [index, title] of this.titles.entries()) {
            filters.mime_types.push({ title: this.title, extensions: this.extensions[index] || '*' })
          }
        } else {
          filters.mime_types = [{ title: this.title, extensions: this.extensions }]
        }
      }

      const init = {
        FilesAdded: function () {
          if (that.isShowLoading) {
            that.loadinger = showLoading()
          }
        },
        FileUploaded: function (uploader, file, info, url) {
          if (that.isShowLoading && that.loadinger) {
            that.loadinger.close()
          }
          info = JSON.parse(info)
          that.$emit('onUploadedFile', url, info.key)
        },
        Error: function (uploader, err, errTip) {
          if (that.isShowLoading && that.loadinger) {
            that.loadinger.close()
          }
          console.log({ uploader, err, errTip })
        }
      }

      this.uploader = initUploader({
        browse_button: this.id,
        multi_selection: false,
        filters,
        init
      })
    }
  },
  destroyed () {
    if (this.uploader) {
      this.uploader.destroy()
    }
  }
}
</script>

<style scoped lang="less">
@import 'Upload.less';
</style>
