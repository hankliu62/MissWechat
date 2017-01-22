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
            @onChangeModel="onChangePublicWechatName">
          </input-btn-group>
        </template>
        <template v-if="tab.value === states.CONSTANTS.QRCODE_WECHAT_TAB_TYPES.PERSONAL">
          <div>个人账户</div>
        </template>
      </tab-panel>
    </tabs>
  </div>
</template>

<script>
import { Tabs, TabList, Tab, TabPanel } from '../../../../../../components/Tabs'
import InputBtnGroup from '../../../../../../components/InputBtnGroup/InputBtnGroup'
import { QRCODE_WECHAT_TAB_TYPES, QRCODE_WECHAT_TYPE_TABS } from '../../constants/constants'

export default {
  data () {
    this.states = {
      CONSTANTS: {
        QRCODE_WECHAT_TAB_TYPES
      }
    }

    return {
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
    onChangePublicWechatName (value) {
      this.publicWechatName = value
    }
  },
  components: { Tabs, TabList, Tab, TabPanel, InputBtnGroup }
}
</script>

<style scoped lang="less">
@import './WechatQrcodeGenerate';
</style>
