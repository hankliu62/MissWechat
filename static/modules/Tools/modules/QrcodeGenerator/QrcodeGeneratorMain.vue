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
      123
    </div>
  </div>
</template>

<script>
import { QRCODE_GENERATOR_MAIN_NAVS } from './constants/nav'

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
  }
}
</script>

<style scoped lang="less">
@import './QrcodeGeneratorMain';
</style>
