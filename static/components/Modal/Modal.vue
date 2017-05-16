<template>
  <el-dialog :title="title" :custom-class="`hk-dialog hk-modal ${customClass}`" v-model="isOpen" :size="size" @close="onClose">
    <slot name="body"></slot>
    <div slot="footer" class="dialog-footer" v-if="defaultFooter">
      <el-button class="btn hk-btn btn-cancel" @click="onCancelHandler">取消</el-button>
      <el-button class="btn hk-btn btn-theme" @click="onOk">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      isOpen: this.isShow
    }
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    defaultFooter: {
      type: Boolean
    },
    customClass: {
      type: String,
      default: ''
    },
    title: {
      type: String
    },
    size: {
      type: String,
      default: 'small' // tiny/small/large/full
    },
    onClose: {
      type: Function,
      default: function (done) {
        done && done()
      }
    },
    onOk: {
      type: Function,
      default: function () {}
    },
    onCancel: {
      type: Function
    }
  },
  methods: {
    onCancelHandler () {
      const cancelHandler = this.onCancel || this.onClose
      cancelHandler()
    }
  },
  watch: {
    isOpen (val) {
      if (!val) {
        this.onClose()
      }
    },
    isShow (val) {
      this.isOpen = val
    }
  }
}
</script>
