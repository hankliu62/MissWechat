<template>
  <div class="url-qrcode-generater">
    <input class="hk-input" placeholder="http://" v-model="value" @change="onChange" />
  </div>
</template>

<script>
import { PARAM_TYPES } from '../../constants/constants';

export default {
  data () {
    return {
      value: ''
    }
  },
  props: {
    qrcodeContent: Object
  },
  methods: {
    onChange (event) {
      this.value = event.target.value;
      const qrcodeContent = this.qrcodeContent || {}
      const content = { ...qrcodeContent, [PARAM_TYPES.URL]: this.value }
      this.$emit('onChangeContent', content)
    }
  },
  watch: {
    qrcodeContent (content) {
      this.value = content ? content[PARAM_TYPES.URL] || '' : ''
    }
  }
}
</script>

<style scoped lang="less">
@import './UrlQrcodeGenerate';
</style>
