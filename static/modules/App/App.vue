<template>
  <div class="container">
    <router-view></router-view>
    <toast :is-show="isShowToast" :content="toast.content"></toast>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Toast from '../../components/Toast/Toast'

export default {
  computed: {
    isShowToast: function () {
      return !!this.toast.count && !!this.toast.content;
    },
    ...mapState({
      toast: state => state.commonMain.toast
    })
  },
  components: { Toast }
}
</script>

<style scoped lang="less">
@import './App';
</style>

<style lang="less">
@import '../../styles/reset';
@import '../../styles/app';
@import '../../styles/components/hk-loading';
</style>
