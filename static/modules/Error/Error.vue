<template>
  <div class="error-container">
    <div class="error-wrapper">
      <div class="error-icon-wrapper left-wrapper">
        <div class="icon-footer"></div>
        <div class="icon-header"></div>
      </div>
      <div class="error-content-wrapper">
        <div class="content-title" v-text="$route.params.code"></div>
        <div class="content-message" v-text="message"></div>
      </div>
      <div class="error-icon-wrapper right-wrapper">
        <div class="icon-header"></div>
        <div class="icon-footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    message: function () {
      let message = ''
      switch (this.$route.params.code) {
        case '404':
          message = 'Page not found :('
          break;
        case '500':
          message = 'Internal Server Error :('
          break
        default:
          message = 'Internal Server Error :('
      }
      return message
    }
  }
}
</script>

<style lang="less">
@import './Error';
</style>
