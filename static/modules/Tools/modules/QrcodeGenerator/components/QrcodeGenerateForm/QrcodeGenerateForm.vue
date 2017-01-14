<template>
  <div class="qrcode-generate-form">
    <slot></slot>
    <div class="btn-group">
      <button class="btn hk-btn btn-theme" @click="onGenerateQrcode">生产二维码</button>
    </div>
  </div>
</template>

<script>
import autosize from 'autosize';
import { PARAM_TYPES } from '../../constants/constants';
import Simditor from '../../../../../../components/Simditor/Simditor'

export default {
  data () {
    return {}
  },
  methods: {
    onGenerateQrcode () {
      this.$emit('generate')
    }
  }
}
</script>

<style scoped lang="less">
@import './QrcodeGenerateForm';
</style>
