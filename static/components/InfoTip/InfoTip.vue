<template>
  <div class="hk-info-tip" @click.self="onClick">
    <el-tooltip
      class="item"
      effect="dark"
      placement="top"
      popper-class="hk-tooltip-popper"
      :disabled="hiddenTip">
      <div slot="content">
        <slot name="tip"></slot>
      </div>
      <span class="upload-types-tip"><icon-circle :type="type" v-if="!!type"></icon-circle>{{ content }}</span>
    </el-tooltip>
  </div>
</template>

<script>
import IconCircle from '../IconCircle/IconCircle'

export default {
  data () {
    return {}
  },
  props: {
    hiddenTip: {
      type: Boolean,
      default: false
    },
    content: {
      type: String
    },
    type: {
      type: String
    }
  },
  methods: {
    onClick () {
      this.$emit('onClick')
    }
  },
  components: {
    IconCircle
  }
}
</script>

<style scoped lang="less">
@import './InfoTip';
</style>
