<template>
  <div class="count-input">
    <input class="hk-input" :maxLength="maxLength" v-model="value" @input="onChange" :placeholder="placeholder" />
    <span class="count-box" v-text="`${value.length}/${maxLength}`" v-if="!!maxLength"></span>
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
    maxLength: String,
    placeholder: String,
    model: String
  },
  methods: {
    onChange (e) {
      this.$emit('change', e.target.value)
    }
  },
  watch: {
    model (value) {
      this.value = value
    }
  },
  mounted () {
    this.value = this.model
  }
}
</script>

<style scoped lang="less">
@import './CountInput';
</style>

