<template>
<footer :class="{ 'hk-footer': true, 'fixed': fixed }">
  <div class="copyright">	&copy; 2016-{{ year }} Miss小店 版权所有 | ICP 备案号 沪ICP备XXXXXXXXX号-XX</div>
</footer>
</template>

<script>
function footerPosition (vm) {
  const contentHeight = document.body.scrollHeight
  const winHeight = window.innerHeight
  if (contentHeight <= winHeight) {
    vm.fixed = true
  } else {
    vm.fixed = false
  }
}

export default {
  data () {
    return {
      year: new Date().getFullYear(),
      fixed: false
    }
  },
  methods: {
    onResize () {
      footerPosition(this)
    }
  },
  mounted () {
    window.addEventListener('resize', this.onResize, false)
    footerPosition(this)
  },
  destroyed () {
    window.removeEventListener('resize', this.onResize, false)
  }
}
</script>

<style scoped lang="less">
@import './CopyFooter';
</style>
