<template>
  <div
    ref="notification"
    :class="['notification', `notification-${type}`, { 'notification-dismissible': isClosable }]">
    <span
      type="button"
      data-dismiss="alert"
      class="close"
      @click="onCloseNotification"
      v-if="isClosable">
      <span aria-hidden="true">&times;</span>
      <span class="sr-only">Close</span>
    </span>
    <notification-content></notification-content>
  </div>
</template>

<script>
const CONSTANTS = {
  TYPES: ['success', 'info', 'warning', 'danger']
}
export default {
  data () {
    return {}
  },
  props: {
    isBelowNav: Boolean,
    type: {
      type: String,
      default: 'success',
      validator: function (value) {
        return CONSTANTS.TYPES.includes(value)
      }
    },
    isClosable: {
      type: Boolean,
      default: true
    },
    content: {
      type: String,
      default: ''
    },
    renderContent: Function,
    onClose: Function
  },
  methods: {
    onCloseNotification () {
      if (this.onClose) {
        this.onClose()
        this.$emit('close')
      }
      this.$destroy()
    }
  },
  components: {
    NotificationContent: {
      render (createElement) {
        const parent = this.$parent
        if (parent.$slots.default) {
          return createElement('div', parent.$slots.default)
        } else if (parent.renderContent) {
          return parent.renderContent(createElement)
        } else if (parent.content) {
          const options = { attrs: { class: 'notification-content' } }
          return createElement('span', options, parent.content)
        } else {
          return ''
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
@import './Notification';
</style>
