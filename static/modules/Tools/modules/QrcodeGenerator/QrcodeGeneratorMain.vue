<template>
  <div class="qrcode-container">
    <div class="navbar">
      <div class="navbar-header">Qrcode Generator</div>
      <div role="navigation" id="navs" class="nav-collapse">
        <ul class="navs-wrapper">
          <li
            v-for="item in nav"
            :class="['nav', { active: item.link.indexOf(states.params.type) >= 0 }]">
            <a :href="item.link" v-text="item.name"></a>
          </li>
        </ul>
      </div>
      <a href="#nav" class="nav-toggle">Menu</a>
    </div>
    <div class="container-fluid main-content-view">
      <div class="row ov main-content">
        <div class="brace left-brace col-md-1"></div>
        <div class="main-content-wrap col-md-10">
          <div class="qrcode-generate-box">
            <div class="qrcode-generate-wrap">
              <text-qrcode-generate @generate="onGenerateQrcode"></text-qrcode-generate>
            </div>
            <div class="qrcode-preview-wrap">
              <qrcode-preview url="http://oiq00n80p.bkt.clouddn.com/585f4ac893a1ae6e07c1f373.jpg?imageView2/1/w/230/h/230"></qrcode-preview>
            </div>
          </div>
        </div>
        <div class="brace right-brace col-md-1"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { QRCODE_GENERATOR_MAIN_NAVS } from './constants/nav'
import TextQrcodeGenerate from './components/TextQrcodeGenerate/TextQrcodeGenerate'
import QrcodePreview from './components/QrcodePreview/QrcodePreview'

export default {
  data () {
    this.states = {
      params: this.$route.params
    }

    return {
      nav: QRCODE_GENERATOR_MAIN_NAVS
    }
  },
  mounted () {
    const ResponsiveNav = require('responsive-nav')
    var navigation = ResponsiveNav('navs', {
      customToggle: '.nav-toggle',
      jsClass: 'qrcode-html',
      navActiveClass: 'qrcode-html-navs-toggled'
    })
  },
  methods: {
    onGenerateQrcode (params) {
      console.log(params.value)
      const AraleQRCode = require('arale-qrcode')
      const qrcode = new AraleQRCode({
        render: 'canvas',
        text: params.value,
        size: 256,
        correctLevel: 2,
        background: '#FFFFFF',
        foreground: '#000000'
      });
      console.log(qrcode)
      console.log(qrcode.toDataURL('image/png'))
    }
  },
  components: { TextQrcodeGenerate, QrcodePreview }
}
</script>

<style scoped lang="less">
@import './QrcodeGeneratorMain';
</style>
