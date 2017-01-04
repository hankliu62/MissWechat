<template>
  <div class="qrcode-container">
    <div class="navbar">
      <div class="navbar-header">Qrcode Generator</div>
      <div role="navigation" id="navs" class="nav-collapse">
        <ul class="navs-wrapper">
          <li class="nav active"><a href="#">Home</a></li>
          <li class="nav"><a href="#">About</a></li>
          <li class="nav"><a href="#">Projects</a></li>
          <li class="nav"><a href="#">Blog</a></li>
        </ul>
      </div>
      <a href="#nav" class="nav-toggle">Menu</a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
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
