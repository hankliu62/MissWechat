<template>
  <div class="exhibition-image-card" v-if="url" @click="onClick">
    <img class="exhibition-image" :src="url" />
    <mask-remove @onRemove="onClose" />
  </div>
</template>

<script>
import MaskRemove from '../MaskRemove/MaskRemove'

export default {
  data () {
    return {}
  },
  props: {
    url: String
  },
  methods: {
    onClose () {
      this.$emit('onClose')
    },
    onClick () {
      this.$emit('onClick')
    }
  },
  components: {
    MaskRemove
  }
}
</script>

<style scoped lang="less">
@import './ExhibitionImage';
</style>
