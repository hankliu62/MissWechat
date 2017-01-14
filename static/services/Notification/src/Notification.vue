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
    <template v-if="!content">
      <notification-content></notification-content>
    </template>
    <template v-if="content">
      <div v-html="content"></div>
    </template>
  </div>
</template>

<script>
const CONSTANTS = {
  TYPES: ['success', 'info', 'warning', 'danger']
}
export default {
  data () {
    return {
      isBelowNav: true,
      isClosable: true,
      type: 'success',
      content: '',
      renderContent: null
    }
  },
  methods: {
    onCloseNotification () {
      if (this.close) {
        this.close(this)
        this.$emit('close')
      }
      this.$destroy()
    }
  },
  mounted () {
    this.timer = setTimeout(function () {
      this.onCloseNotification()
    }.bind(this), 3000)
  },
  components: {
    NotificationContent: {
      render (createElement) {
        const parent = this.$parent
        if (parent.$slots.default) {
          return createElement('div', parent.$slots.default)
        } else if (parent.renderContent) {
          return parent.renderContent(createElement)
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
