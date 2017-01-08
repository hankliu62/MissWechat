<template>
  <li
    :class="['tab', {[activeTabClassName]: selected, [disabledTabClassName]: disabled}]"
    role="tab"
    :id="id"
    :tab-index="index"
    :aria-selected="selected ? 'true' : 'false'"
    :aria-disabled="disabled ? 'true' : 'false'"
    :aria-controls="panelId"
    @click="onClickTab"
  ><slot></slot></li>
</template>

<script>
export default {
  props: {
    id: String,
    selected: Boolean,
    disabled: Boolean,
    activeTabClassName: {
      type: String,
      default: 'selected'
    },
    disabledTabClassName: {
      type: String,
      default: 'disabled'
    },
    panelId: String,
    index: Number,
    value: null
  },
  methods: {
    onClickTab () {
      if (!this.disabled) {
        this.$parent.$parent.$emit('selected', this, this.index)
      }
    }
  }
}
</script>
