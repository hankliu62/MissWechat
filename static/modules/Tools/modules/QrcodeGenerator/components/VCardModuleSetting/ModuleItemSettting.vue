<template>
  <div :class="`module-setting ${module}-module-setting`" :style="{top: `${top}px`}">
    <slot></slot>
    <i class="icon icon-close close" @click="onClose"></i>
    <i class="popper-arrow popper-arrow-backend"></i>
    <i class="popper-arrow popper-arrow-frontend"></i>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    module: String,
    top: Number
  },
  methods: {
    onClose () {
      this.$emit('close')
    }
  }
}
</script>
