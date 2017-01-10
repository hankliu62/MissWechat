<template>
  <div class="qrcode-tools-panel logo-tools-panel">
    <div class="two-item-preline">
      <div class="basic-property-item">
        <upload title="Image files" extensions="jpg,jpeg,gif,png" @onUploadedFile="onUploadedFile">
          <button class="btn hk-btn btn-theme">上传 LOGO</button>
        </upload>
      </div>
      <div class="basic-property-item">
        <button class="btn hk-btn btn-theme" @click="onOpenLogosDialog">常用 LOGO</button>
      </div>
    </div>
    <div class="logo-preview" v-if="url">
      <img class="logo-source" :src="url" />
      <i class="icon-remove" @click="onRemoveLogo"></i>
    </div>

    <logos-dialog
      :isShow="isShowLogosDialog"
      @onCloseDialog="onCloseLogosDialog"
      @onSelectLogo="onSelectLogoFromDialog">
    </logos-dialog>
  </div>
</template>

<script>
import LogosDialog from '../LogosDialog/LogosDialog'
import Upload from '../../../../../../components/Upload/Upload'

export default {
  data () {
    return {
      isShowLogosDialog: false,
      url: ''
    }
  },
  props: {
    logoUrl: String
  },
  methods: {
    onOpenLogosDialog () {
      this.isShowLogosDialog = true
    },
    onCloseLogosDialog () {
      this.isShowLogosDialog = false
    },
    onSelectLogoFromDialog (url) {
      this.onSetLogoUrl(url)
      this.onCloseLogosDialog()
    },
    onRemoveLogo () {
      this.$emit('onSetLogoUrl', '')
    },
    onUploadedFile (url) {
      this.onSetLogoUrl(`${url}?imageView2/1/w/40/h/40`)
    },
    onSetLogoUrl (url) {
      this.url = url
      this.$emit('onSetLogoUrl', url)
    }
  },
  watch: {
    logoUrl (newValue) {
      this.url = newValue
    }
  },
  components: { LogosDialog, Upload }
}
</script>

<style scoped lang="less">
@import './LogoToolsPanel';
</style>
