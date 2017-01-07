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
              <text-qrcode-generate @generate="onGenerateQrcode"></text-qrcode-generate>
            </div>
            <div class="qrcode-preview-wrap">
              <qrcode-preview :url="qrcodeUrl" @download="onDownloadQrcode"></qrcode-preview>
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
import DownloadUtil from '../../../../utils/DownloadUtil'

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
      qrcodeUrl: (state) => state.qrcodeGeneratorMain.qrcodeUrl
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
    ...mapActions(['fetchQiniuUptoken', 'generateTextQrcode']),
    onGenerateQrcode (params) {
      const AraleQRCode = require('arale-qrcode')
      const qrcode = new AraleQRCode({
        render: 'canvas',
        text: params.value,
        size: 256,
        correctLevel: 2,
        background: '#FFFFFF',
        foreground: '#000000'
      });

      if (qrcode) {
        const dataURL = qrcode.toDataURL('image/png')
        const base64Data = dataURL.replace(/^data:image\/\w+;base64,/, '');
        this.generateTextQrcode(base64Data)
      }
    },
    onDownloadQrcode () {
      const index = this.qrcodeUrl.lastIndexOf('/') + 1
      const filename = this.qrcodeUrl.slice(index)
      DownloadUtil.download(this.qrcodeUrl, filename)
    }
  },
  components: { TextQrcodeGenerate, QrcodePreview }
}
</script>

<style scoped lang="less">
@import './QrcodeGeneratorMain';
</style>
