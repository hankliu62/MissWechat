<template>
  <div class="qrcode-container">
    <div class="navbar">
      <div class="navbar-header">二维码生成器</div>
      <div role="navigation" id="navs" class="nav-collapse">
        <ul class="navs-wrapper">
          <li
            v-for="item in nav.items"
            :class="['nav', { active: item.link.indexOf(states.params.type) >= 0 }]">
            <a :href="item.link" v-text="item.name"></a>
          </li>
        </ul>
      </div>
      <a href="#nav" class="nav-toggle">
        <svg class="icon hidden" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
        </svg>
      </a>
    </div>
    <header class="header header-fixed">
      <div class="background-mask"></div>
      <div class="content">
        <h1 class="title">Qrcode Genetator</h1>
        <p class="desc">The most professional qrcode online generate site, can be simple and efficient to help you achieve the requirements of qrcode production.</p>
      </div>
    </header>
    <div class="container-fluid main-content-view">
      <div class="row ov main-content">
        <div class="brace left-brace col-md-1"></div>
        <div class="main-content-wrap col-md-10">
          <div class="qrcode-generate-box">
            <div class="qrcode-generate-wrap">
              <text-qrcode-generate :qrcodeContent="qrcodeContent" @generate="onGenerateQrcode"></text-qrcode-generate>
            </div>
            <div class="qrcode-preview-wrap">
              <qrcode-preview :url="qrcodeUrl" @download="onDownloadQrcode"></qrcode-preview>
              <qrcode-tools
                :faultToleranceLevel="faultToleranceLevel"
                :size="size"
                :foreground="foreground"
                :background="background"
                :logoUrl="logoUrl"
                @onSetLevel="onSetLevel"
                @onSetSize="onSetSize"
                @onSetForeground="onSetForeground"
                @onSetBackground="onSetBackground"
                @onSetLogoUrl="onSetLogoUrl">
              </qrcode-tools>
            </div>
          </div>
        </div>
        <div class="brace right-brace col-md-1"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import TextQrcodeGenerate from './components/TextQrcodeGenerate/TextQrcodeGenerate'
import QrcodePreview from './components/QrcodePreview/QrcodePreview'
import QrcodeTools from './components/QrcodeTools/QrcodeTools'
import DownloadUtil from '../../../../utils/DownloadUtil'
import Qrcode from '../../../../libs/qrcode'

export default {
  data () {
    this.states = {
      params: this.$route.params
    }

    return {}
  },
  computed: {
    ...mapState({
      nav: (state) => state.qrcodeGeneratorMain.nav,
      qrcodeUrl: (state) => state.qrcodeGeneratorMain.qrcodeUrl,
      faultToleranceLevel: (state) => state.qrcodeGeneratorMain.faultToleranceLevel,
      size: (state) => state.qrcodeGeneratorMain.size,
      foreground: (state) => state.qrcodeGeneratorMain.foreground,
      background: (state) => state.qrcodeGeneratorMain.background,
      logoUrl: (state) => state.qrcodeGeneratorMain.logoUrl,
      qrcodeContent: (state) => state.qrcodeGeneratorMain.qrcodeContent
    })
  },
  mounted () {
    this.fetchQiniuUptoken()
    const ResponsiveNav = require('responsive-nav')
    var navigation = ResponsiveNav('navs', {
      customToggle: '.nav-toggle',
      jsClass: 'qrcode-html',
      navActiveClass: 'qrcode-html-navs-toggled'
    })
  },
  methods: {
    setState: mapActions(['setQrcodeGeneratorState'])['setQrcodeGeneratorState'],
    ...mapActions(['fetchQiniuUptoken', 'generateTextQrcode']),
    onGenerateQrcode (params) {
      this.setState({ [params.type]: params.value })
      const options = {
        render: 'canvas',
        text: params.value,
        size: this.size,
        correctLevel: this.faultToleranceLevel,
        background: this.background,
        foreground: this.foreground
      }

      if (this.logoUrl) {
        options.image = this.logoUrl
        options.imageSize = 50
      }
      const qrcode = new Qrcode(options)

      qrcode.create().then(function (qr) {
        if (qr) {
          const dataURL = qr.toDataURL('image/png')
          const base64Data = dataURL.replace(/^data:image\/\w+;base64,/, '')
          this.generateTextQrcode(base64Data)
        }
      }.bind(this))
    },
    onDownloadQrcode () {
      const index = this.qrcodeUrl.lastIndexOf('/') + 1
      const filename = this.qrcodeUrl.slice(index)
      DownloadUtil.download(this.qrcodeUrl, filename)
    },
    onSetLevel (faultToleranceLevel) {
      this.setState({ faultToleranceLevel })
    },
    onSetSize (size) {
      this.setState({ size })
    },
    onSetForeground (foreground) {
      this.setState({ foreground })
    },
    onSetBackground (background) {
      this.setState({ background })
    },
    onSetLogoUrl (logoUrl) {
      this.setState({ logoUrl })
    }
  },
  components: { TextQrcodeGenerate, QrcodePreview, QrcodeTools }
}
</script>

<style scoped lang="less">
@import './QrcodeGeneratorMain';
</style>
