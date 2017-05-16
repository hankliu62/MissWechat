<template>
  <div :class="{ 'vcard-module-item': true, actived: isActived, [extraClass || '']: true }" @mouseenter="onMouseOverModule" @mouseleave="onMouseOutModule">
    <slot></slot>
    <vcard-module-item-mask :is-show="isShowMask" :content="maskContent">
      <slot name="maskContent" v-if="!maskContent"></slot>
    </vcard-module-item-mask>
  </div>
</template>

<script>
import VcardModuleItemMask from './VCardModuleItemMask'

export default {
  data () {
    return {
      isShowMask: false
    }
  },
  props: {
    maskContent: String,
    isActived: Boolean,
    extraClass: String
  },
  methods: {
    onMouseOverModule () {
      this.isShowMask = true
    },
    onMouseOutModule () {
      this.isShowMask = false
    }
  },
  components: {
    VcardModuleItemMask
  }
}
</script>
