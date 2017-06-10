<template>
  <div class="hk-color-picker">
    <div ref="pickerSource" class="color-picker-source" @click="onClickShowPicker">
      <div class="color-preview-box" :style="{ backgroundColor: value }"></div>
    </div>
    <form ref="pickerPopup" class="color-picker-form" @submit.prevent="onSubmit" v-show="isShow">
      <div :id="states.id" class="color-picker-target"></div>
      <div class="color-input-wrapper">
        <span class="color-display" :style="{ backgroundColor: pickedColor }"></span>
        <div :class="['input-box', { highlight: isErrorColor }]">
          <input
            :class="['form-control hk-input color-input', { 'form-control-error': isErrorColor }]"
            v-model="pickedColor"
            @focus="onFocusColorInput"/>
          <span class="form-tip" v-if="isErrorColor">请正确选择颜色</span>
        </div>
      </div>
      <div class="btn-group clearfix">
        <input class="btn hk-btn btn-theme" type="submit" value="确认" />
        <span class="btn hk-btn btn-cancel" type="cancel" @click="onCancelPicker">取消</span>
      </div>
    </form>
    <div class="picker-mask" v-if="isShow" @click.self="onCancelPicker"></div>
  </div>
</template>

<script>
import colorjoe from 'colorjoe'
import 'colorjoe/css/colorjoe.css'
import ColorUtil from '../../utils/ColorUtil'
import ElementUtil from '../../utils/ElementUtil'

const setPickerColor = function (vm, color) {
  if (vm.states.colorPicker) {
    vm.states.colorPicker.set(color)
  }
}

const CONSTANTS = {
  DEFAULT_COLOR: '#FFFFFF'
}

export default {
  data () {
    this.states = {
      id: `color-picker-target-${new Date().valueOf()}`,
      CONSTANTS: CONSTANTS
    }
    return {
      isShow: false,
      pickedColor: CONSTANTS.DEFAULT_COLOR,
      isErrorColor: false
    }
  },
  props: {
    value: {
      default: CONSTANTS.DEFAULT_COLOR
    }
  },
  methods: {
    onClickShowPicker () {
      this.isShow = true
    },
    onSubmit () {
      if (ColorUtil.isHexColor(this.pickedColor)) {
        setPickerColor(this, this.pickedColor)
        this.isShow = false
        this.$emit('submit', this.pickedColor)
      } else {
        this.isErrorColor = true
      }
    },
    onCancelPicker () {
      this.isShow = false;
    },
    onFocusColorInput () {
      this.isErrorColor = false
    }
  },
  watch: {
    isShow (nextValue) {
      const container = document.getElementById('html-container')

      if (nextValue) {
        if (!this.states.colorPicker) {
          this.states.colorPicker = colorjoe.rgb(this.states.id, '#000')
          this.states.colorPicker.on('change', function (color) {
            this.pickedColor = ColorUtil.toHex(color.css())
          }.bind(this))
        }

        if (this.$refs && this.$refs.pickerSource && container) {
          const containerSize = ElementUtil.getElementSize(container)
          const position = ElementUtil.getElementRelativePosition(this.$refs.pickerSource)
          // const size = ElementUtil.getElementSize(this.$refs.pickerSource)
          // const parent = this.$refs.pickerSource.offsetParent
          // let parentSize = { ...position }
          // if (parent) {
          //   parentSize = ElementUtil.getElementSize(parent)
          // }

          if (this.$refs && this.$refs.pickerPopup) {
            if (containerSize.height - position.top < 350 + 20) {
              const styleObject = {
                top: '-10%',
                transform: 'translate(-50%, -100%)',
                webkitTransform: 'translate(-50%, -100%)',
                mozTransform: 'translate(-50%, -100%)',
                msTransform: 'translate(-50%, -100%)',
                oTransform: 'translate(-50%, -100%)'
              }
              ElementUtil.setElementStyle(this.$refs.pickerPopup, styleObject)
            }
          }
        }

        if (this.value && this.value !== this.pickedColor) {
          this.pickedColor = this.value
        }
      }
    },
    value (nextValue) {
      this.pickedColor = nextValue
    }
  }
  // computed: {
  //   pickerDisplayColor () {
  //     return ColorUtil.isHexColor(this.pickedColor) ? this.pickedColor : this.states.CONSTANTS.DEFAULT_COLOR
  //   }
  // }
}
</script>

<style scoped lang="less">
@import './ColorPicker';
</style>

<style lang="less">
@import '././ColorPickerModule';
</style>
