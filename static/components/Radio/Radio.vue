<template>
  <div :class="['hk-radio', { selected: label === model }]" @click="onClick">
    <span
      :class="['icon icon-radio icon-2x', { 'icon-ok-circle': label === model, 'icon-circle-blank': label !== model}]">
    </span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    label: [String, Number, Boolean],
    model: [String, Number, Boolean]
  },
  methods: {
    onClick () {
      this.$emit('onChange', this.label)
    }
  }
}
</script>

<style scoped lang="less">
@import './Radio';
</style>
