<template>
  <div class="input-button-group">
    <input
      class="hk-input"
      disabled
      :placeholder="placeholder"
      v-model="model"
      v-if="disabled" />
    <input
      class="hk-input"
      :placeholder="placeholder"
      v-model="model"
      v-if="!disabled"
      @input="onChange" />
    <div class="btn hk-btn btn-theme" v-text="btnText" @click="onClickBtn"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: ''
    }
  },
  props: {
    value: {},
    placeholder: String,
    btnText: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onChange (event) {
      this.model = event.target.value
      this.$emit('onChangeModel', this.model)
      this.$emit('change', this.model)
    },
    onClickBtn () {
      this.$emit('onClickBtn', this.model)
    }
  },
  mounted () {
    this.model = this.value
  },
  watch: {
    value (val) {
      this.model = val
    }
  }
}
</script>

<style scoped lang="less">
@import './InputBtnGroup';
</style>

