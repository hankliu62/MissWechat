<template>
  <div class="qrcode-generate-form">
    <slot></slot>
    <div class="btn-group" v-if="isShowBtn">
      <button class="btn hk-btn btn-theme" @click="onGenerateQrcode" v-text="btnText"></button>
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
  props: {
    btnText: {
      type: String,
      default: '生成二维码'
    },
    isShowBtn: {
      type: Boolean,
      default: true
    }
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
