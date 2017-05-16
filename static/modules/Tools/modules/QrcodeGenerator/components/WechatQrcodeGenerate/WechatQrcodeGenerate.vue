<template>
  <div class="wechat-qrcode-generater">
    <tabs v-model="selectedTab" type="pills" @selected="onSelectCodeTab">
      <tab-list slot="tablist">
        <tab
          panelId="options-panel"
          class="options-header"
          slot="tab"
          v-for="(tab, index) in tabs"
          :id="'tools-tab-' + tab.value"
          :index="index"
          :selected="selectedTab === tab.value"
          :value="tab.value"
          v-text="tab.name"></tab>
      </tab-list>
      <tab-panel
        slot="tabpanel"
        v-for="(tab, index) in tabs"
        :id="'tools-tabpanel-' + tab.value"
        :index="index"
        :selected="selectedTab === tab.value">
        <template v-if="tab.value === states.CONSTANTS.QRCODE_WECHAT_TAB_TYPES.PUBLIC">
          <input-btn-group
            :model="publicWechatName"
            :placeholder="publicWechatPlaceholder"
            btnText="确定"
            @onChangeModel="onChangePublicWechatName"
            @onClickBtn="onClickBtn">
          </input-btn-group>
          <collapse
            class="wechat-collapse"
            :is-collapsed="isCollapseWechat"
            @collapsed="onToggleCollapseWechat">
            <div slot="trigger" class="collapse-wechat-header clearfix">
              <info-tip type="question" content="微信公众号如何获取微信号" :hiddenTip="true"></info-tip>
              <i class="icon icon-angle-down icon-collapse-trigger pull-right"></i>
            </div>
            <div slot="content" class="collapse-content">
              <ul class="steps">
                <li class="steps-item">步骤：</li>
                <li class="steps-item">1.进入微信，点击右上角的搜索图标</li>
                <li class="steps-item">2.点击最右边的微信公众号，然后输入公众号的名称，进行搜索</li>
                <li class="steps-item">3.点击搜索到的公众号，进入到账号信息页面，就可以看到公众号的微信号了。</li>
              </ul>
            </div>
          </collapse>
          <collapse
            class="wechat-collapse wechat-image-collapse"
            :is-collapsed="isCollapseWechatImage"
            @collapsed="onToggleCollapseWechatImage">
            <div slot="trigger" class="collapse-wechat-header clearfix">
              <info-tip type="question" content="微信公众号如何获取二维码图片" :hiddenTip="true"></info-tip>
              <i class="icon icon-angle-down icon-collapse-trigger pull-right"></i>
            </div>
            <div slot="content" class="collapse-content">
              <ul class="steps">
                <li class="steps-item">步骤：</li>
                <li class="steps-item">1.登陆微信公众号。https://mp.weixin.qq.com/</li>
                <li class="steps-item">2.登陆后在公众平台的设置处找到公众账号设置</li>
                <li class="steps-item">3.右键保存二维码图片</li>
              </ul>
            </div>
          </collapse>
        </template>
        <template v-if="tab.value === states.CONSTANTS.QRCODE_WECHAT_TAB_TYPES.PERSONAL">
          <div>个人账户</div>
          <collapse
            class="wechat-collapse"
            :is-collapsed="isCollapseScan"
            @collapsed="onToggleCollapseScan">
            <div slot="trigger" class="collapse-wechat-header clearfix">
              <info-tip type="question" content="如何获取二维码 & 如何进行摄像头扫码" :hiddenTip="true"></info-tip>
              <i class="icon icon-angle-down icon-collapse-trigger pull-right"></i>
            </div>
            <div slot="content" class="collapse-content">
              <ul class="steps">
                <li class="steps-item">步骤：</li>
                <li class="steps-item">1.在手机上登录微信</li>
                <li class="steps-item">2.点击右下角的按钮“我”，然后点击左上角头像</li>
                <li class="steps-item">3.点击二维码名片</li>
                <li class="steps-item">4.点击摄像头扫码，将二维码图片对准摄像头即可</li>
              </ul>
            </div>
          </collapse>
        </template>
      </tab-panel>
    </tabs>
  </div>
</template>

<script>
import { Tabs, TabList, Tab, TabPanel } from '../../../../../../components/Tabs'
import InputBtnGroup from '../../../../../../components/InputBtnGroup/InputBtnGroup'
import Collapse from '../../../../../../components/Collapse/Collapse'
import IconCircle from '../../../../../../components/IconCircle/IconCircle'
import InfoTip from '../../../../../../components/InfoTip/InfoTip'
import { QRCODE_WECHAT_TAB_TYPES, QRCODE_WECHAT_TYPE_TABS, PARAM_TYPES } from '../../constants/constants'

const CONSTANTS = {
  DEFAULT_WECHAT_CONTENT: {
    public: {
      name: ''
    },
    personal: {}
  }
}

const getWechatContent = function (vm) {
  const qrcodeContent = vm.qrcodeContent || {}
  const wechatContent = qrcodeContent[PARAM_TYPES.WECHAT] ? qrcodeContent[PARAM_TYPES.WECHAT] : CONSTANTS.DEFAULT_WECHAT_CONTENT
  return wechatContent
}

export default {
  data () {
    this.states = {
      CONSTANTS: {
        QRCODE_WECHAT_TAB_TYPES
      }
    }

    return {
      isCollapseWechat: false,
      isCollapseWechatImage: false,
      isCollapseScan: false,
      tabs: QRCODE_WECHAT_TYPE_TABS,
      selectedTab: QRCODE_WECHAT_TAB_TYPES.PUBLIC,
      publicWechatName: '',
      publicWechatPlaceholder: '请输入微信公众号的微信号，例如：hankliu62'
    }
  },
  props: {
    qrcodeContent: Object
  },
  methods: {
    onSelectCodeTab (tab, index) {
      this.selectedTab = tab.value
    },
    onChangePublicWechatName (name) {
      this.publicWechatName = name
      const wechatContent = getWechatContent(this)
      const qrcodeContent = {
        ...(this.qrcodeContent || {}),
        [PARAM_TYPES.WECHAT]: {
          personal: wechatContent.personal,
          public: { name: this.publicWechatName }
        }
      }
      this.$emit('onChangeContent', qrcodeContent)
    },
    onClickBtn () {
      this.$emit('generate')
    },
    onToggleCollapseWechat () {
      this.isCollapseWechat = !this.isCollapseWechat
      this.isCollapseWechatImage = false
    },
    onToggleCollapseWechatImage () {
      this.isCollapseWechatImage = !this.isCollapseWechatImage
      this.isCollapseWechat = false
    },
    onToggleCollapseScan () {
      this.isCollapseScan = !this.isCollapseScan
    }
  },
  watch: {
    qrcodeContent (content) {
      const isExitPublicWechatName = content && content[PARAM_TYPES.WECHAT] &&
        content[PARAM_TYPES.WECHAT].public
      this.publicWechatName = isExitPublicWechatName ? content[PARAM_TYPES.WECHAT].public.name || '' : ''
    }
  },
  components: { Tabs, TabList, Tab, TabPanel, InputBtnGroup, Collapse, IconCircle, InfoTip }
}
</script>

<style scoped lang="less">
@import './WechatQrcodeGenerate';
</style>
