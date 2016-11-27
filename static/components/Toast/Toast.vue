<template>
  <transition name="fade">
    <div v-if="isShow" class="toast">
      <div class="toast-content">
        <div class="content-wrapper">
          <div class="content" v-html="content"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    content: {
      required: true
    },
    isShow: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="less">
@import './Toast.less';
</style>
