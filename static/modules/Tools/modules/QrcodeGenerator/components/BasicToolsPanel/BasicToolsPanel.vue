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
            v-model="currentFaultToleranceLevels"
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
          <el-slider class="hk-slider" :min="62" :max="620" v-model="size" @change="onChangeSize"></el-slider>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { FAULT_TOLERANCE_LEVELS } from '../../constants/constants'
export default {
  data () {
    return {
      faultToleranceLevels: FAULT_TOLERANCE_LEVELS,
      currentFaultToleranceLevels: FAULT_TOLERANCE_LEVELS[0].value,
      size: 300
    }
  },
  methods: {
    onSelectFaultToleranceLevel (level) {
      this.currentFaultToleranceLevels = level
      this.$emit('onSelectFaultToleranceLevel', level)
    },
    onChangeSize (size) {
      this.size = size
      this.$emit('onChangeSize', size)
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
