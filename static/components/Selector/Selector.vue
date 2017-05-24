<template>
  <div :class="{'hk-select hk-select-custom': true, [cclass || '']: true, 'disabled': disabled, 'open-dropdown': isShowDropdown}">
    <div
      :class="{'select-input': true, 'empty-value': this.value === null || this.value === undefined}"
      @click="onTriggerDropdown">
      <div class="select-input-content" v-text="currentLabel || placeholder"></div>
      <i class="icon-caret"></i>
    </div>
    <div :class="{'select-dropdown': true, [popperClass || '']: true, 'hidden': !isShowDropdown}">
      <ul class="select-dropdown-list">
        <li
          class="select-dropdown-item"
          v-for="item in items"
          v-text="item[labelField]"
          :data-value="item[valueField]"
          @click="onSelect(item)"></li>
      </ul>
    </div>
  </div>
</template>

<script>
function getCurrentItem (vm, value) {
  if (vm.items && vm.items.length) {
    for (const item of vm.items) {
      if (item === value) {
        return item
      }

      if (item[vm.valueField] === value) {
        return item
      }
    }
  }

  return null
}
export default {
  data () {
    return {
      isShowDropdown: false,
      currentLabel: ''
    }
  },
  props: {
    items: {
      type: Array,
      default: function () {
        return []
      }
    },
    value: {},
    labelField: {
      type: String,
      default: 'label'
    },
    valueField: {
      type: String,
      default: 'value'
    },
    disabled: [String, Boolean],
    placeholder: {
      type: String,
      default: '请选择'
    },
    cclass: String,
    popperClass: String
  },
  mounted () {
    const item = getCurrentItem(this, this.value)
    if (item) {
      this.currentLabel = item[this.labelField]
    } else {
      this.currentLabel = ''
    }
  },
  watch: {
    value (val) {
      const item = getCurrentItem(this, val)
      if (item) {
        this.currentLabel = item[this.labelField]
      } else {
        this.currentLabel = ''
      }
    }
  },
  methods: {
    onSelect (item) {
      this.onTriggerDropdown()
      this.$emit('change', item)
    },
    onTriggerDropdown () {
      this.isShowDropdown = !this.isShowDropdown
    }
  }
}
</script>

<style scoped lang="less">
@import './Selector';
</style>
