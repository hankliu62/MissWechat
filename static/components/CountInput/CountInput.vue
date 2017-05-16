<template>
  <div class="count-input">
    <input class="hk-input" v-model="value" @change="onChange" />
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
    model: String
  },
  methods: {
    onChange (e) {
      console.log(e.value)
      this.$emit('onChange', e.value)
    }
  },
  watch: {
    model (value) {
      this.value = value
    }
  }
}
</script>

<style scoped lang="less">
@import './CountInput';
</style>

