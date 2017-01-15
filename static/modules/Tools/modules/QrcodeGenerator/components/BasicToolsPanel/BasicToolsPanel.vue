<template>
  <div class="qrcode-tools-panel basic-tools-panel">
    <div class="basic-property-item">
      <label class="property-item-title">容错：</label>
      <div class="property-item-content">
        <template>
          <el-select
            class="hk-select"
            placeholder="请选择"
            popper-class="hk-select-dropdown"
            v-model="currentLevel"
            @change="onSelectFaultToleranceLevel">
            <el-option
              v-for="item in faultToleranceLevels"
              :label="item.label"
              :value="item.value">
              <span v-text="item.label"></span>
            </el-option>
          </el-select>
        </template>
      </div>
    </div>
    <div class="basic-property-item">
      <label class="property-item-title">大小：</label>
      <div class="property-item-content">
        <template>
          <el-slider class="hk-slider" :min="62" :max="620" v-model="currentSize" @change="onChangeSize"></el-slider>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { FAULT_TOLERANCE_LEVELS, DEFAULT_FAULT_TOLERANCE_LEVEL } from '../../constants/constants'

export default {
  data () {
    return {
      faultToleranceLevels: FAULT_TOLERANCE_LEVELS,
      currentLevel: DEFAULT_FAULT_TOLERANCE_LEVEL,
      currentSize: 300
    }
  },
  props: {
    faultToleranceLevel: Number,
    size: Number
  },
  methods: {
    onSelectFaultToleranceLevel (level) {
      this.faultToleranceLevel = level
      this.$emit('onSetLevel', level)
    },
    onChangeSize (size) {
      this.$emit('onSetSize', size)
    }
  },
  watch: {
    faultToleranceLevel (newValue) {
      this.currentLevel = newValue
    },
    size (newValue) {
      this.currentSize = newValue
    }
  }
}
</script>

<style scoped lang="less">
@import './BasicToolsPanel';
</style>

<style lang="less">
@import '../../styles/components/qrcode-tools-panel';
@import '../../../../../../styles/components/hk-select';
@import '../../../../../../styles/components/hk-slider';
</style>
