<template>
  <div class="tools-main-container">
    <router-view></router-view>
    <copy-footer></copy-footer>
  </div>
</template>

<script>
import CopyFooter from '../../components/CopyFooter/CopyFooter'

export default {
  data () {
    return {}
  },
  components: {CopyFooter}
}
</script>

<style scoped lang="less">
@import "./ToolsMain";
</style>

<style lang="less">
@import '../../styles/components/hk-scrollbar';
</style>
