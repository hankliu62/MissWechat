<template>
  <div class="hk-collapse">
    <div class="trigger-wrap cp" @click="onCollapsed">
      <slot name="trigger"></slot>
    </div>
    <div :class="['panel-collapse', { 'in': isShow }]">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: false
    }
  },
  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onCollapsed () {
      this.$emit('collapsed', !this.isShow)
    }
  },
  watch: {
    isCollapsed (value) {
      this.isShow = value
    }
  }
}
</script>

<style scoped lang="less">
@import './Collapse';
</style>
