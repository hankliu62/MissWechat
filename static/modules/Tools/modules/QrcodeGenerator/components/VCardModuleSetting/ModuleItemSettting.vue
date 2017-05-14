<template>
  <div :class="`module-setting ${module}-module-setting`">
    <slot></slot>
    <i class="icon icon-close close"></i>
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
    module: String
  }
}
</script>
