<template>
  <modal
    title="上传头像"
    :is-show="isShow"
    :default-footer="true"
    custom-class="upload-avatar-modal"
    :onOk="onOkCropper"
    :onClose="onClose">
    <div slot="body" class="upload-avatar-modal-body" v-if="isShow">
      <info-tip content="如图片上传异常，请选择其他浏览器，如IE、谷歌浏览器" type="info" :hidden-tip="true" />
      <cropper :image="url" @ready="initCropper" :max-width="420" />
    </div>
  </modal>
</template>

<script>
import Modal from '../../../../../../components/Modal/Modal'
import Cropper from '../../../../../../components/Cropper/Cropper'
import InfoTip from '../../../../../../components/InfoTip/InfoTip'
import QiniuUtil from '../../../../../../utils/QiniuUtil'
import QrcodeUtil from '../../../../../../utils/QrcodeUtil'

export default {
  data () {
    return {
      cropper: null
    }
  },
  props: {
    isShow: Boolean,
    url: String,
    onOk: Function,
    onClose: Function
  },
  methods: {
    async onOkCropper () {
      const canvas = this.cropper.getCroppedCanvas()
      const imageData = QrcodeUtil.convertToBase64(canvas)
      const url = await QiniuUtil.uploadBase64Image(imageData)
      this.onOk(url)
    },
    initCropper (cropper) {
      this.cropper = cropper;
    }
  },
  components: {
    Modal,
    Cropper,
    InfoTip
  }
}
</script>

<style scoped lang="less">
@import './UploadVCardAvatarModalModule';
</style>
