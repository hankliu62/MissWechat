<template>
  <div class="hex-container">
    <headroom-nav :nav="nav"></headroom-nav>
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
