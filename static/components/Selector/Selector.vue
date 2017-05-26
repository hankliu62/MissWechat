<template>
  <div :class="{[`hk-select hk-select-custom ${cclass || ''}`]: true, 'disabled': disabled, 'open-dropdown': isShowDropdown}">
    <div
      :class="{'select-input': true, 'empty-value': this.value === null || this.value === undefined}"
      @click="onTriggerDropdown">
      <div class="select-input-content" v-text="currentLabel || placeholder"></div>
      <i class="icon-caret"></i>
    </div>
    <div
      ref="dropdown"
      :class="{'direction-up': direction === 'up', 'hidden': !isShowDropdown,
        [`select-dropdown ${popperClass || ''}`]: true}">
      <ul class="select-dropdown-list">
        <li
          class="select-dropdown-item"
          v-for="item in items"
          v-text="item[labelField]"
          :data-value="item[valueField]"
          @click.stop.prevent="onSelect(item)"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import ElementUtil from '../../utils/ElementUtil'

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
      currentLabel: '',
      direction: 'up'
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

    document.addEventListener('click', this.onClickDocument, false)
  },
  updated () {
    if (this.isShowDropdown) {
      const bodyHeight = ElementUtil.getBodySize().height
      const dropdownHeigth = ElementUtil.getElementSize(this.$refs.dropdown).height
      const top = ElementUtil.getElementRelativePosition(this.$refs.dropdown).top
      let otherHeight = 0
      const footer = document.getElementsByClassName('hk-footer')
      if (footer && footer.length) {
        const footerHeigth = ElementUtil.getElementSize(footer[0]).height
        otherHeight += footerHeigth
      }

      if (dropdownHeigth + top + otherHeight > bodyHeight) {
        this.direction = 'up'
      } else {
        this.direction = 'down'
      }
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
    },
    onClickDocument (event) {
      if (!this.$el.contains(event.target)) {
        this.isShowDropdown = false
      }
    }
  },
  destroyed () {
    document.removeEventListener('click', this.onClickDocument, false)
  }
}
</script>

<style scoped lang="less">
@import './Selector';
</style>
