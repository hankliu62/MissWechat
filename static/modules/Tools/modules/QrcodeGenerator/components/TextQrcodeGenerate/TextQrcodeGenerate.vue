<template>
  <div class="text-qrcode-generater">
    <i
      :class="['icon icon-2x', { 'icon-angle-up': isShowSimditor, 'icon-angle-down': !isShowSimditor }]"
      @click.stop.prevent.self="onToggleEditor">
    </i>
    <textarea
      class="form-control hk-text"
      placeholder="请输入文字内容"
      ref="text"
      v-model="value"
      v-if="!isShowSimditor">
    </textarea>
    <simditor :options="simditorOptions" v-if="isShowSimditor"></simditor>
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
    this.simditorOptions = {
      placeholder: '请输入文字内容'
    }

    return {
      value: '',
      isShowSimditor: false
    }
  },
  props: {
    qrcodeContent: Object
  },
  mounted () {
    if (this.$refs.text) {
      autosize(this.$refs.text);
    }
  },
  methods: {
    onGenerateQrcode () {
      this.$emit('generate', { type: PARAM_TYPES.TEXT, value: this.value })
    },
    onToggleEditor () {
      this.isShowSimditor = !this.isShowSimditor
    }
  },
  watch: {
    qrcodeContent (content) {
      this.value = content ? content[PARAM_TYPES.TEXT] || '' : ''
    }
  },
  components: { Simditor }
}
</script>

<style scoped lang="less">
@import './TextQrcodeGenerate';
</style>

<style lang="less">
@import '../../../../../../styles/components/hk-btn';
</style>
