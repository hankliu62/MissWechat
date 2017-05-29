<template>
  <div :class="{'hk-preview': true, 'hidden': !isShow}" @click.self="onClose">
    <div class="preview-content">
      <iframe class="preview-iframe" :src="url"></iframe>
      <i class="el-dialog__close el-icon el-icon-close close" @click.self.prevent.stop="onClose"></i>
    </div>
  </div>
</template>

<script>
import ElementUtil from '../../../../../../utils/ElementUtil'
export default {
  data () {
    return {}
  },
  props: {
    isShow: Boolean,
    url: String,
    onClose: {
      type: Function,
      default: function () {}
    }
  },
  watch: {
    isShow (val) {
      this.isOpen = val

      ElementUtil.changeModalVisibilityChenckBodyOverflow(this.$el, val)
    }
  }
}
</script>
