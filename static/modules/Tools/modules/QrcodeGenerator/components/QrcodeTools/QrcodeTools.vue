<template>
  <div class="qrcode-tools">
    <tabs class="justified" v-model="selectedTab" type="underlined" @selected="onSelectCodeTab">
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
        <template v-if="tab.value === QRCODE_TOOLS_TAB_TYPES.BASIC">
          <basic-tools-panel></basic-tools-panel>
        </template>
        <template v-if="tab.value === QRCODE_TOOLS_TAB_TYPES.COLOR">
          <color-tools-panel></color-tools-panel>
        </template>
        <template v-if="tab.value === QRCODE_TOOLS_TAB_TYPES.LOGO">
          <logo-tools-panel></logo-tools-panel>
        </template>
      </tab-panel>
    </tabs>
  </div>
</template>

<script>
import { Tabs, TabList, Tab, TabPanel } from '../../../../../../components/Tabs'
import BasicToolsPanel from '../BasicToolsPanel/BasicToolsPanel'
import ColorToolsPanel from '../ColorToolsPanel/ColorToolsPanel'
import LogoToolsPanel from '../LogoToolsPanel/LogoToolsPanel'
import { QRCODE_TOOLS_TAB_TYPES, QRCODE_TOOLS_TABS } from '../../constants/constants'
export default {
  data () {
    this.QRCODE_TOOLS_TAB_TYPES = QRCODE_TOOLS_TAB_TYPES

    return {
      tabs: QRCODE_TOOLS_TABS,
      selectedTab: QRCODE_TOOLS_TAB_TYPES.BASIC
    }
  },
  props: {
  },
  methods: {
    onSelectCodeTab (tab, index) {
      this.selectedTab = tab.value
    }
  },
  components: { Tabs, TabList, Tab, TabPanel, BasicToolsPanel, ColorToolsPanel, LogoToolsPanel }
}
</script>

<style scoped lang="less">
@import './QrcodeTools';
</style>
