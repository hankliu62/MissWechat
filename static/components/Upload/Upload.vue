<template>
  <div id="uploadcontainer" class="file-upload">
    <div id="pickfiles" class="upload-presentation-layer">
      <slot></slot>
    </div>
    <div class="upload-progress" v-if="isShowprogress" v-show="isLoading"></div>
  </div>
</template>

<script>
import { initUploader } from '../../utils/QiniuUtil'

const getElementStyle = (elem, styleKey) => {
  if (elem[styleKey]) {
    return elem.style[styleKey]
  }

  if (elem.currentStyle) {
    return elem.currentStyle[styleKey]
  }

  if (document.defaultView && document.defaultView.getComputedStyle) {
    styleKey = styleKey.replace(/([A-Z])/g, '-$1').toLowerCase()
    return document.defaultView.getComputedStyle(elem, null).getPropertyValue(styleKey)
  }

  return null
}

export default {
  data () {
    return {
      maskStyle: {},
      isLoading: false
    }
  },
  props: {
    isShowprogress: [Boolean],
    acceptTypes: {
      type: Array,
      default: ['image/jpg', 'image/jpeg', 'image/png']
    }
  },
  mounted () {
    if (this.$slots.default) {
      const slotDOM = this.$slots.default[0].elm;
      const width = getElementStyle(slotDOM, 'width')
      const height = getElementStyle(slotDOM, 'height')

      this.maskStyle = { width, height }

      const uploader = initUploader({
        browse_button: 'pickfiles'
      })
    }
  },
  computed: {
    fileMuliples () {
      return (this.acceptTypes || []).join(', ')
    }
  }
}
</script>

<style scoped lang="less">
@import 'Upload.less';
</style>
