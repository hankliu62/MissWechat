<template>
  <div class="vcard-mask" v-if="isShow">
    <slot name="content"></slot>
    <div class="mask-content" v-if="!!content" v-text="content"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    isShow: {
      type: Boolean
    },
    content: {
      type: String
    }
  }
}
</script>
