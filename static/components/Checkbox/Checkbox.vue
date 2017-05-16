<template>
  <div class="hk-checkbox">
    <el-checkbox v-model="checked">
      <div class="checkbox-child" @click="onClickCheckbox">
        <slot></slot>
      </div>
      <input type="text" class="hidden" :value="value" />
    </el-checkbox>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checked: false
    }
  },
  props: {
    value: {}
  },
  methods: {
    onClickCheckbox () {
      this.checked = !this.checked
    }
  },
  watch: {
    checked (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.checked = val
    }
  }
}
</script>

<style scoped lang="less">
@import './Checkbox';
</style>
