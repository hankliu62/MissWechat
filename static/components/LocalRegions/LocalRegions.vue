<template>
  <div class="hk-regions hk-regions-local">
    <div class="regions-item regions-province">
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
    </div>
    <div class="regions-item regions-city">
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
    </div>
    <div class="regions-item regions-county">
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
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style scoped lang="less">
@import "./LocalRegions";
</style>
