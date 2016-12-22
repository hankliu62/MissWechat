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
      <div class="options-wrapper">
        <tabs v-model="optionsTabs">
          <tab-list slot="tablist">
            <tab
              class="options-header"
              panelId="options-panel"
              slot="tab"
              :id="states.inputTab.headerId"
              :selected="optionsTabs.tab === states.inputTab.headerId">Hex Converter Params From</tab>
          </tab-list>
          <tab-panel
            slot="tabpanel"
            :id="states.inputTab.bodyId"
            :selected="optionsTabs.panel === states.inputTab.bodyId">
            <section class="options-tabpanel-body">
              <h1 class="title" v-text="states.inputTab.title"></h1>
              <hr>
              <div class="desc" v-text="states.inputTab.desc"></div>
              <textarea
                class="form-control code"
                name="code"
                placeholder="Write you code"
                v-model="code"
              ></textarea>
              <div class="btns-group">
                <button type="button" class="btn btn-default btn-theme" @click="onTransform">Transform</button>
                <button type="button" class="btn btn-default btn-theme" @click="onLoad">Load</button>
                <button type="button" class="btn btn-default btn-theme" @click="onUpload">Upload</button>
              </div>
            </section>
          </tab-panel>
        </tabs>
      </div>

      <!-- result tabs -->
      <div class="result-wrapper">
        <tabs class="result-tabs" v-model="optionsTabs">
          <tab-list slot="tablist">
            <tab
              panelId="options-panel"
              class="options-header"
              slot="tab"
              :id="states.inputTab.headerId"
              :selected="optionsTabs.tab === states.inputTab.headerId">Hex Converter Params From</tab>
          </tab-list>
          <tab-panel
            slot="tabpanel"
            :id="states.inputTab.bodyId"
            :selected="optionsTabs.panel === states.inputTab.bodyId">
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
import { mapActions, mapState } from 'vuex'
import { Tabs, TabList, Tab, TabPanel } from '../../../../components/Tabs'
import HeadroomNav from '../../../../components/HeadroomNav/HeadroomNav'
import { HEX_CONVERTER_MAIN_NAVS } from './constants/navs'
import { PARAM_TYPES } from './constants/constants'

export default {
  data () {
    this.states = {
      inputTab: {
        headerId: 'input-tab',
        bodyId: 'input-tab-panel'
      },
      params: this.$route.params
    }

    return {
      code: ''
    }
  },
  methods: {
    ...(mapActions(['convert'])),
    setState: mapActions(['setHexConverterState'])['setHexConverterState'],
    onSelectedRow (index) {
      this.setState({ selectedIndex: index })
    },
    onTransform () {
      this.convert({ type: this.states.params.type, code: this.code })
    },
    onLoad () {
      window.alert('The Function Will Coming')
    },
    onUpload () {
      window.alert('The Function Will Coming')
    }
  },
  computed: {
    ...mapState({
      isShowExamples: (state) => state.hexConverterMain.isShowExamples,
      selectedIndex: (state) => state.hexConverterMain.selectedIndex,
      optionsTabs: (state) => state.hexConverterMain.optionsTabs,
      nav: (state) => state.hexConverterMain.nav,
      result: (state) => state.hexConverterMain.result,
      example: (state) => state.hexConverterMain.example
    })
  },
  created () {
    let appendProperties = {}
    if (this.states.params.type === PARAM_TYPES.ENCODE) {
      appendProperties = {
        title: 'HexaDecimal To String',
        desc: 'Enter the string text to encode'
      }
    } else {
      appendProperties = {
        title: 'String To HexaDecimal',
        desc: 'Enter the hexadecimal text to decode'
      }
    }
    Object.assign(this.states.inputTab, appendProperties)
  },
  components: { Tabs, TabList, Tab, TabPanel, HeadroomNav }
}
</script>

<style scoped lang="less">
@import './HexConverterMain';
</style>
