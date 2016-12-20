<template>
  <nav ref="navbar" class="navbar navbar-fixed clearfix">
    <div class="navbar-header" v-text="nav.title" v-if="!nav.logo"></div>
    <div class="navbar-header" v-text="nav.title" v-if="nav.logo" :style="{ backgroundImage: 'url(' + nav.logo + ')' }"></div>
    <ul class="navs">
      <li :class="['nav', { 'actived': nav.actived }]" v-for="nav in nav.items">
        <a class="nav-link" :href="nav.link" v-text="nav.name"></a>
      </li>
    </ul>
    <slot></slot>
  </nav>
</template>

<script>
import Headroom from 'headroom.js'

export default {
  data () {
    this.states = {
      headroom: null
    }
    return {}
  },
  props: {
    nav: {
      type: Object,
      default: {
        title: '',
        logo: '',
        items: []
      }
    }
  },
  mounted () {
    const headroom = new Headroom(this.$refs.navbar, {
      tolerance: 5,
      offset: 105,
      classes: {
        initial: 'animated',
        pinned: 'slideDown',
        unpinned: 'slideUp'
      }
    })
    headroom.init()
    this.states.headroom = headroom
  },
  destroyed () {
    if (this.states.headroom) {
      if (this.states.headroom.destroy) {
        this.states.headroom.destroy()
      } else {
        this.states.headroom = null
        delete this.states.headroom
      }
    }
  }
}
</script>

<style scoped lang="less">
@import './HeadroomNav';
</style>
