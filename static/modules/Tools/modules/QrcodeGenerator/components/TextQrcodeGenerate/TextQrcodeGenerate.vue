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
      v-if="!isShowSimditor"
      @change="onChange">
    </textarea>
    <simditor :content="value" :options="simditorOptions" v-if="isShowSimditor" @valuechanged="onChangeContent"></simditor>
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
    onToggleEditor () {
      this.isShowSimditor = !this.isShowSimditor
      this.value = ''
    },
    onChange (event) {
      this.value = event.target.value;
      this.$emit('changeContent', this.value)
    },
    onChangeContent (content) {
      this.value = content;
      this.$emit('changeContent', this.value)
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
