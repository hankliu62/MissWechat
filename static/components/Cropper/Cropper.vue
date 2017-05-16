<template>
  <div class="hk-cropper">
    <div ref="holder" class="cropper-holder">
      <img id="cropperImage" class="cropper-hidden" ref="cropper" :src="image" />
    </div>
    <div class="preview-pane">
      <div class="preview-container">
        <div ref="preview" class="preview" />
      </div>
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import ImageUtil from '../../utils/ImageUtil'
import ElementUtil from '../../utils/ElementUtil'

const restoreCropperHolder = async function (vm, url) {
  url = url || vm.image
  const imageData = await ImageUtil.getSize(url)

  if (imageData && imageData.height) {
    const holder = vm.$refs.holder
    const holderMaxHeight = +(ElementUtil.getElementStyle(holder, 'maxHeight').replace('px', '')) || 360
    ElementUtil.setElementStyle(holder, {
      maxWidth: `${imageData.width * holderMaxHeight / imageData.height}px`,
      maxHeight: `${holderMaxHeight}px`
    })
  }
}

const getCropperOptions = function (vm) {
  const defaultOptions = {
    dragMode: 'move',
    aspectRatio: 1,
    movable: false,
    rotatable: false,
    zoomable: false,
    preview: vm.$refs.preview,
    ready () {
      vm.$emit('ready', this.cropper)
    },
    crop (e) {
      vm.$emit('crop', this.cropper, e)
    }
  }

  return { ...defaultOptions, ...(vm.cropperOptions || {}) }
}

const getCropperInstance = function (vm) {
  if (!vm.cropper) {
    // const image = document.getElementById('cropperImage')
    const cropperOptions = getCropperOptions(vm)
    const cropper = new Cropper(vm.$refs.cropper, cropperOptions)
    vm.cropper = cropper
  }

  return vm.cropper
}

export default {
  data () {
    return {}
  },
  props: {
    image: {
      type: String
    },
    cropperOptions: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  async mounted () {
    await restoreCropperHolder(this)
    getCropperInstance(this)
  },
  watch: {
    async image (url) {
      const cropper = getCropperInstance(this)
      cropper.replace(url)
      await restoreCropperHolder(this, url)
      cropper.reset()
    }
  }
}
</script>

<style lang="css">
@import '../../../node_modules/cropperjs/dist/cropper.min.css';
</style>

<style scoped lang="less">
@import './Cropper';
</style>

<style lang="less">
@import './CropperModule';
</style>
