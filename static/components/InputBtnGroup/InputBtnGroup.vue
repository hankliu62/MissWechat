<template>
  <div class="input-button-group">
    <input
      class="hk-input"
      disabled
      :placeholder="placeholder"
      v-model="value"
      v-if="disabled" />
    <input
      class="hk-input"
      :placeholder="placeholder"
      v-model="value"
      v-if="!disabled"
      @change="onChange" />
    <div class="btn hk-btn btn-theme" v-text="btnText"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  props: {
    model: String,
    placeholder: String,
    btnText: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onChange (event) {
      this.value = event.target.value
      this.$emit('onChangeModel', this.value)
    }
  },
  watch: {
    model (newValue) {
      this.value = newValue
    }
  }
}
</script>

<style scoped lang="less">
@import './InputBtnGroup';
</style>

