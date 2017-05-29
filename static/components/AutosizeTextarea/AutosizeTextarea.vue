<template>
  <div class="autosize-text-container">
    <textarea
      ref="text"
      class="form-control hk-text"
      :placeholder="placeholder"
      :style="textStyle"
      :maxLength="maxLength"
      v-model="value"
      @input="onChangeText">
    </textarea>

    <span class="count-box" v-text="`${currentLength}/${maxLength}`" v-if="!!maxLength"></span>
  </div>
</template>

<script>
import autosize from 'autosize';

export default {
  data () {
    return {
      value: ''
    }
  },
  props: {
    model: String,
    maxLength: [String, Number],
    placeholder: String,
    textStyle: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  mounted () {
    this.value = this.model

    if (this.$refs.text) {
      autosize(this.$refs.text);
      this.$refs.text.value = this.value;
      autosize.update(this.$refs.text);
    }
  },
  methods: {
    onChangeText (event) {
      this.value = event.target.value
      this.$emit('change', this.value)
    }
  },
  watch: {
    model (val) {
      this.value = val
    }
  },
  computed: {
    currentLength () {
      const valueLength = this.value.length
      if (this.$refs.text) {
        const realLength = this.$refs.text.value.length
        return realLength >= valueLength ? realLength : valueLength
      }

      return valueLength
    }
  }
}
</script>

<style scoped lang="less">
@import './AutosizeTextarea';
</style>

