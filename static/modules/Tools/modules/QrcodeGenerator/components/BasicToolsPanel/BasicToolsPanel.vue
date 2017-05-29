<template>
  <div class="qrcode-tools-panel basic-tools-panel">
    <div class="basic-property-item">
      <label class="property-item-title">容错：</label>
      <div class="property-item-content">
        <template>
          <selector
            cclass="hk-select"
            placeholder="请选择"
            popper-class="hk-select-dropdown"
            label-field="label"
            value-field="value"
            :items="faultToleranceLevels"
            v-model="currentLevel"
            @change="onSelectFaultToleranceLevel">
          </selector>
        </template>
      </div>
    </div>
    <div class="basic-property-item">
      <label class="property-item-title">大小：</label>
      <div class="property-item-content">
        <template>
          <el-slider
            class="hk-slider"
            :min="62"
            :max="620"
            v-model="currentSize"
            @change="onChangeSize">
          </el-slider>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { FAULT_TOLERANCE_LEVELS, DEFAULT_FAULT_TOLERANCE_LEVEL } from '../../constants/constants'
import Selector from '../../../../../../components/Selector/Selector'

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
      this.$emit('onSetLevel', level.value)
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
  },
  components: {
    Selector
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
