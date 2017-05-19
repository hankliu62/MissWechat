<template>
  <textarea
    class="form-control hk-text"
    :placeholder="placeholder"
    ref="text"
    v-model="model"
    @change="onChangeText">
  </textarea>
</template>

<script>
import autosize from 'autosize';

export default {
  data () {
    return {
      model: ''
    }
  },
  props: {
    value: Object,
    placeholder: String
  },
  mounted () {
    if (this.$refs.text) {
      autosize(this.$refs.text);
    }
  },
  methods: {
    onChangeText (event) {
      this.model = event.target.value
      this.$emit('input', this.value)
    }
  },
  watch: {
    value (val) {
      this.model = val : ''
    }
  }
}
</script>

<style scoped lang="less">
@import './AutosizeTextarea';
</style>

