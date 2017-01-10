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
          <basic-tools-panel
            :faultToleranceLevel="faultToleranceLevel"
            :size="size"
            @onSetLevel="onSetLevel"
            @onSetSize="onSetSize">
          </basic-tools-panel>
        </template>
        <template v-if="tab.value === QRCODE_TOOLS_TAB_TYPES.COLOR">
          <color-tools-panel
            :foreground="foreground"
            :background="background"
            @onSetForeground="onSetForeground"
            @onSetBackground="onSetBackground">
          </color-tools-panel>
        </template>
        <template v-if="tab.value === QRCODE_TOOLS_TAB_TYPES.LOGO">
          <logo-tools-panel :logoUrl="logoUrl" @onSetLogoUrl="onSetLogoUrl"></logo-tools-panel>
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
    faultToleranceLevel: Number,
    size: Number,
    foreground: String,
    background: String,
    logoUrl: String
  },
  methods: {
    onSelectCodeTab (tab, index) {
      this.selectedTab = tab.value
    },
    onSetLevel (faultToleranceLevel) {
      this.$emit('onSetLevel', faultToleranceLevel)
    },
    onSetSize (size) {
      this.$emit('onSetSize', size)
    },
    onSetForeground (foreground) {
      this.$emit('onSetForeground', foreground)
    },
    onSetBackground (background) {
      this.$emit('onSetBackground', background)
    },
    onSetLogoUrl (url) {
      this.$emit('onSetLogoUrl', url)
    }
  },
  components: { Tabs, TabList, Tab, TabPanel, BasicToolsPanel, ColorToolsPanel, LogoToolsPanel }
}
</script>

<style scoped lang="less">
@import './QrcodeTools';
</style>
