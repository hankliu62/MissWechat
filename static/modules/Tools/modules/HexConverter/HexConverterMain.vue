<template>
  <div class="hex-container">
    <headroom-nav :nav="nav"></headroom-nav>
    <header class="header header-fixed">
      <div class="background-mask"></div>
      <div class="content">
        <h1 class="title">HexaDecimal Converter</h1>
        <p class="desc">Characteristics of one transform hexadecimal to string and convert string to hexadecimal</p>
      </div>
    </header>
    <div class="hex-body"></div>
  </div>
</template>

<script>
import HeadroomNav from '../../../../components/HeadroomNav/HeadroomNav'
import { HEX_CONVERTER_MAIN_NAVS } from './constants/navs'

export default {
  data () {
    return {
      nav: {
        items: HEX_CONVERTER_MAIN_NAVS,
        title: 'Hex Converter'
      }
    }
  },
  components: { HeadroomNav }
}
</script>

<style scoped lang="less">
@import './HexConverterMain';
</style>
