<template>
  <modal
    title="保存成功"
    :is-show="isShow"
    :default-footer="true"
    size="tiny"
    custom-class="vcard-save-modal"
    ok-text="预览"
    :onOk="onOk"
    :onClose="onClose">
    <div slot="body" class="vcard-save-modal-body">
      <qrcode-preview :url="url" @download="onDownloadQrcode" />
    </div>
  </modal>
</template>

<script>
import Modal from '../../../../../../components/Modal/Modal'
import QrcodePreview from '../QrcodePreview/QrcodePreview'
import DownloadUtil from '../../../../../../utils/DownloadUtil'

export default {
  data () {
    return {}
  },
  props: {
    isShow: Boolean,
    onOk: Function,
    onClose: Function,
    url: String
  },
  methods: {
    onDownloadQrcode () {
      const index = this.url.lastIndexOf('/') + 1
      const filename = this.url.slice(index)
      DownloadUtil.download(this.url, filename)
    }
  },
  components: {
    QrcodePreview,
    Modal
  }
}
</script>

<style scoped lang="less">
@import './VCardSaveModal';
</style>
