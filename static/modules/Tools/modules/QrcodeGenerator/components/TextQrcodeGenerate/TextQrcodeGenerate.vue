<template>
  <div class="text-qrcode-generater">
    <textarea
      class="form-control hk-text"
      placeholder="请输入文字内容"
      ref="text"
      v-model="value">
    </textarea>
    <div class="btn-group">
      <button class="btn btn-theme" @click="onGenerateQrcode">生产二维码</button>
    </div>
  </div>
</template>

<script>
import autosize from 'autosize';
import { PARAM_TYPES } from '../../constants/constants';

export default {
  data () {
    return {
      value: ''
    }
  },
  props: {
    model: [String]
  },
  mounted () {
    if (this.$refs.text) {
      autosize(this.$refs.text);
    }
  },
  methods: {
    onGenerateQrcode () {
      this.$emit('generate', { type: PARAM_TYPES.TEXT, value: this.value })
    }
  }
}
</script>

<style scoped lang="less">
@import './TextQrcodeGenerate';
</style>
