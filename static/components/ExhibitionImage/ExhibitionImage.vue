<template>
  <div class="exhibition-image-card" v-if="url">
    <img class="exhibition-image" :src="url" />
    <i class="icon icon-close btn-close" @click.stop.prevent.self="onClose"></i>
  </div>
</template>

<script>
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
    }
  }
}
</script>

<style scoped lang="less">
@import './ExhibitionImage';
</style>
