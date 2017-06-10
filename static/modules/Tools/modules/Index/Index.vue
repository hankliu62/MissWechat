<template>
  <div class="tools-main">
    <div class="tools-main-body">
      <h1 class="title">Choose a tool</h1>
      <ul class="tools">
        <li
          v-for="(menu, index) in CONSTANTS.TOOLS_MENUS"
          :class="['tool-item']"
        ><a class="menu" :href="menu.link" v-text="(index + 1) + ' - ' + menu.title"></a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { TOOLS_MENUS } from '../../constants/constants'

export default {
  data () {
    this.CONSTANTS = {
      TOOLS_MENUS
    }

    return {}
  }
}
</script>

<style lang="less">
@import './Index';
</style>
