<template>
  <li
    :class="['tab', {[activeTabClassName]: selected, [disabledTabClassName]: disabled}]"
    role="tab"
    :id="id"
    :tabIndex="selected ? '0' : null"
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
    panelId: String
  },
  methods: {
    onClickTab () {
      if (!this.disabled) {
        this.$parent.$parent.$emit('selected', { tab: this.id, panel: this.panelId })
      }
    }
  }
}
</script>
