<template>
  <modal title="上传头像" :isShow="true" :defaultFooter="true" customClass="upload-avatar-modal">
    <div slot="body" class="upload-avatar-modal-body">
      <info-tip content="如图片上传异常，请选择其他浏览器，如IE、谷歌浏览器" type="info" :hiddenTip="true" />
      <cropper image="http://oi8brjpnx.bkt.clouddn.com/c589024f9258d109ebf446a6d958ccbf6d814de9.png" />
    </div>
  </modal>
</template>

<script>
import Modal from '../../../../../../components/Modal/Modal'
import Cropper from '../../../../../../components/Cropper/Cropper'
import InfoTip from '../../../../../../components/InfoTip/InfoTip'

export default {
  data () {
    return {
      isShow: true
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
