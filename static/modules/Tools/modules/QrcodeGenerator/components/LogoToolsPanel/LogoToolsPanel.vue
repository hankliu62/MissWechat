<template>
  <div class="qrcode-tools-panel logo-tools-panel">
    <div class="two-item-preline">
      <div class="basic-property-item">
        <button class="btn hk-btn btn-theme">上传 LOGO</button>
      </div>
      <div class="basic-property-item">
        <button class="btn hk-btn btn-theme" @click="onOpenLogosDialog">常用 LOGO</button>
      </div>
    </div>
    <div class="logo-preview" v-if="logoUrl">
      <img class="logo-source" :src="logoUrl" />
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

export default {
  data () {
    return {
      isShowLogosDialog: false,
      logoUrl: ''
    }
  },
  methods: {
    onOpenLogosDialog () {
      this.isShowLogosDialog = true
    },
    onCloseLogosDialog () {
      this.isShowLogosDialog = false
    },
    onSelectLogoFromDialog (url) {
      this.logoUrl = url
      this.onCloseLogosDialog()
    },
    onRemoveLogo () {
      this.logoUrl = ''
    }
  },
  components: { LogosDialog }
}
</script>

<style scoped lang="less">
@import './LogoToolsPanel';
</style>
