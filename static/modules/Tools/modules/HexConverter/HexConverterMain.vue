<template>
  <div class="hex-container">
    <headroom-nav :nav="nav"></headroom-nav>
    <header class="header header-fixed">
      <div class="background-mask"></div>
      <div class="content">
        <h1 class="title">HexaDecimal Converter</h1>
        <p class="desc">Characteristics of one transform hexadecimal to string and convert string to hexadecimal</p>
      </div>
    </header>
    <!-- hex converter panel -->
    <div class="hex-body">
      <!-- params tabs -->
      <div class="input-wrapper">
        <tabs v-model="paramsTabs">
          <tab-list slot="tablist">
            <tab
              panelId="options-panel"
              class="options-header"
              slot="tab"
              :id="states.inputTab.headerId"
              :disabled="true"
              :selected="paramsTabs.tab === states.inputTab.headerId">Hex Converter Params From</tab>
          </tab-list>
          <tab-panel
            slot="tabpanel"
            :id="states.inputTab.bodyId"
            :selected="paramsTabs.panel === states.inputTab.bodyId">
            123
          </tab-panel>
        </tabs>
      </div>

      <!-- result tabs -->
      <div class="result-wrapper">
        <tabs class="result-tabs" v-model="paramsTabs">
          <tab-list slot="tablist">
            <tab
              panelId="options-panel"
              class="options-header"
              slot="tab"
              :id="states.inputTab.headerId"
              :selected="paramsTabs.tab === states.inputTab.headerId">Hex Converter Params From</tab>
          </tab-list>
          <tab-panel
            slot="tabpanel"
            :id="states.inputTab.bodyId"
            :selected="paramsTabs.panel === states.inputTab.bodyId">
            <ul class="codes" @click.self="onSelectedRow(-1)">
              <li
                :class="['code', 'code-' + n, { selected: n === selectedIndex }]"
                :style="{ top: ((n - 1) * 20) + 'px' }"
                v-for="n in 20"
                @click.stop.prevent="onSelectedRow(n)">
                <span>123</span>
              </li>
            </ul>
          </tab-panel>
        </tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { Tabs, TabList, Tab, TabPanel } from '../../../../components/Tabs'
import HeadroomNav from '../../../../components/HeadroomNav/HeadroomNav'
import { HEX_CONVERTER_MAIN_NAVS } from './constants/navs'

export default {
  data () {
    this.states = {
      inputTab: {
        headerId: 'input-tab',
        bodyId: 'input-tab-panel'
      }
    }

    return {
      paramsTabs: {
        tab: this.states.inputTab.headerId,
        panel: this.states.inputTab.bodyId
      },
      nav: {
        items: HEX_CONVERTER_MAIN_NAVS,
        title: 'Hex Converter'
      },
      selectedIndex: -1
    }
  },
  methods: {
    onSelectedRow (index) {
      this.selectedIndex = index;
    }
  },
  components: { Tabs, TabList, Tab, TabPanel, HeadroomNav }
}
</script>

<style scoped lang="less">
@import './HexConverterMain';
</style>
