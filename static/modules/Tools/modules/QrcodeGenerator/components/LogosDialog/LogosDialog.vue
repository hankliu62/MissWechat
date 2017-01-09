<template>
  <el-dialog title="选择Logo" custom-class="hk-dialog logos-dialog" v-model="isShow" @close="onCloseDialog">
    <ul class="logos-group">
      <li class="logos-group-item" v-for="logos in logosGroup">
        <div
          :class="['logo-item', { selected: selectedLogo && selectedLogo.name === log.name }]"
          v-for="log in logos"
          @click.stop.prevent="onSelectLogo(log)">
          <img class="logo" :src="log.url" />
        </div>
      </li>
    </ul>
    <div class="btn-group">
      <button class="btn hk-btn btn-cancel" @click="onCloseDialog">关闭</button>
    </div>
  </el-dialog>
</template>

<script>
import ArrayUtil from '../../../../../../utils/ArrayUtil'

const CONSTANTS = {
  LOGOS: [
    { name: 'weixin1', url: 'http://oiq00n80p.bkt.clouddn.com/weixin1.png' },
    { name: 'weixin2', url: 'http://oiq00n80p.bkt.clouddn.com/weixin2.png' },
    { name: 'weixin3', url: 'http://oiq00n80p.bkt.clouddn.com/weixin3.png' },
    { name: 'app', url: 'http://oiq00n80p.bkt.clouddn.com/app.png' },
    { name: 'weibo1', url: 'http://oiq00n80p.bkt.clouddn.com/weibo1.png' },
    { name: 'weibo2', url: 'http://oiq00n80p.bkt.clouddn.com/weibo2.png' },
    { name: 'cloth', url: 'http://oiq00n80p.bkt.clouddn.com/cloth.png' },
    { name: 'media', url: 'http://oiq00n80p.bkt.clouddn.com/media.png' },
    { name: 'alipay', url: 'http://oiq00n80p.bkt.clouddn.com/alipay.png' },
    { name: 'taobao', url: 'http://oiq00n80p.bkt.clouddn.com/taobao.png' },
    { name: 'shopping', url: 'http://oiq00n80p.bkt.clouddn.com/shopping.png' },
    { name: 'food', url: 'http://oiq00n80p.bkt.clouddn.com/food.png' }
  ]
}

export default {
  data () {
    return {
      logosGroup: ArrayUtil.chunk(CONSTANTS.LOGOS, 4),
      selectedLogo: null
    }
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onCloseDialog () {
      this.$emit('onCloseDialog')
    },
    onSelectLogo (log) {
      this.selectedLogo = log
      this.$emit('onSelectLogo', log.url)
    }
  },
  watch: {
    isShow (newValue) {
      if (newValue) {

      }
    }
  }
}
</script>

<style scoped lang="less">
@import './LogosDialog';
</style>

<style lang="less">
@import './LogosDialogModule';
</style>
