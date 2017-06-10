<template>
  <div id="uploadcontainer" class="file-upload">
    <div :id="id" class="upload-presentation-layer">
      <slot></slot>
    </div>
    <div class="upload-progress" v-if="isShowProgress" v-show="isLoading"></div>
  </div>
</template>

<script>
import QiniuUtil from '../../utils/QiniuUtil'
import ElementUtil from '../../utils/ElementUtil'
import { showLoading } from '../../utils/LoadingUtil'
import ArrayUtil from '../../utils/ArrayUtil'
import { Notification } from '../../services'

const CONSTANTS = {
  MAX_FILE_SIZE: '15mb'
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
    isCreateKey: {
      type: Boolean,
      default: true
    },
    maxFileSize: Number,
    titles: [String, Array],
    extensions: [String, Array]
  },
  mounted () {
    if (this.$slots.default) {
      this.isInited = true
      let slotDOM = null
      for (const dom of this.$slots.default) {
        if (dom.elm && dom.elm.nodeType === 1) {
          slotDOM = dom.elm
          break
        }
      }
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
            filters.mime_types.push({ title, extensions: this.extensions[index] || '*' })
          }
        } else {
          filters.mime_types = [{ title: this.titles, extensions: this.extensions }]
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
          Notification.service({content: errTip, type: 'error'})
          console.log({ uploader, err, errTip })
        }
      }

      this.uploader = QiniuUtil.initUploader({
        browse_button: this.id,
        multi_selection: false,
        isCreateKey: this.isNewName,
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
@import 'Upload';
</style>


<style lang="less">
@import 'UploadModule';
</style>
