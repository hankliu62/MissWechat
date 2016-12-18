<template>
  <div class="goid-container">
    <nav ref="navbar" class="navbar navbar-fixed clearfix">
      <div class="navbar-header">ObjectID Generator</div>
      <ul class="navs">
        <li :class="['nav', { 'actived': nav.actived }]" v-for="nav in navs">
          <a class="nav-link" :href="nav.link" v-text="nav.name"></a>
        </li>
      </ul>
    </nav>
    <header class="header header-fixed">
      <div class="background-mask"></div>
      <div class="content">
        <h1 class="title">Online ObjectID Generator</h1>
        <p class="info">Your ObjectID:</p>
        <h2 class="demo" v-text="demo"></h2>
        <p class="refresh">Refresh page to generate another.</p>
      </div>

      <!--
      <svg class="curve-shadow" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="105" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0 100 C 20 0 50 0 100 100 Z"></path>
      </svg>
      <svg class="curve" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="90" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0 100 C 20 0 50 0 100 100 Z"></path>
      </svg>
      -->
    </header>
    <div class="goid-body">
      <div class="options-wrapper">
        <tabs v-model="optionsTabs">
          <tab-list slot="tablist">
            <tab
              id="options"
              panelId="options-panel"
              class="options-header"
              slot="tab"
              :disabled="true"
              :selected="optionsTabs.tab === 'options-tab'">Generate ObjectID Options</tab>
          </tab-list>
          <tab-panel
            :selected="optionsTabs.panel === 'options-panel'"
            id="options-panel"
            slot="tabpanel">
            <options-form @submit="onGenerateOIds" :type="states.params.type"></options-form>
          </tab-panel>
        </tabs>
      </div>
      <div class="code-wrapper">
        <tabs v-model="codeTabs" @selected="onSelectCodeTab">
          <tab-list slot="tablist">
            <tab id="results" panelId="results-panel" slot="tab" :selected="codeTabs.tab === 'results'">
              <span class="httpsuccess">
                <i class="icon icon-circle"></i>
                <em>&nbsp;200&nbsp;</em>OK
              </span>
            </tab>
            <tab v-if="isShowMetadata" id="metadata" panelId="metadata-panel" slot="tab" :selected="codeTabs.tab === 'metadata'">
              Metadata
            </tab>
            <tab v-if="isShowExamples" id="examples" class="tab-examples" panelId="examples-panel" slot="tab" :selected="codeTabs.tab === 'examples'">
              <span class="for-example">
                <i class="glyphicon glyphicon-circle-arrow-left"></i>
                <span> to examples</span>
              </span>
            </tab>
          </tab-list>

          <tab-panel
            :selected="codeTabs.panel === 'results-panel'"
            id="results-panel"
            slot="tabpanel">
            <ul class="rows-wrapper" @click.self="onSelectedRow(-1)">
              <li
                :class="['row-item', { selected: (item - 1) === selectedIndex }]"
                v-for="item in objectIds.length" v-text="item"
                @click.stop.prevent="onSelectedRow(item)"></li>
            </ul>
            <ul class="ids-wrapper" @click.self="onSelectedRow(-1)">
              <li
                :class="['id-item', { selected: index === selectedIndex }]"
                v-for="(item, index) in objectIds" v-text="item"
                @click.stop.prevent="onSelectedRow(index)"></li>
            </ul>
          </tab-panel>
          <tab-panel
            v-if="isShowMetadata"
            :selected="codeTabs.panel === 'metadata-panel'"
            id="metadata-panel"
            slot="tabpanel">
            <ul class="rows-wrapper" @click.self="onSelectedRow(-1)">
              <li
                :class="['row-item', { selected: (item - 1) === selectedIndex }]"
                v-for="item in objectIds.length" v-text="item"
                @click.stop.prevent="onSelectedRow(item)"></li>
            </ul>
            <ul class="ids-wrapper" @click.self="onSelectedRow(-1)">
              <li
                :class="['id-item', { selected: index === selectedIndex }]"
                v-for="(item, index) in objectIds" v-text="item"
                @click.stop.prevent="onSelectedRow(index)"></li>
            </ul>
          </tab-panel>
          <tab-panel
            v-if="isShowExamples"
            :selected="codeTabs.panel === 'examples-panel'"
            id="examples-panel"
            slot="tabpanel">
            <ul class="rows-wrapper" @click.self="onSelectedRow(-1)">
              <li
                :class="['row-item', { selected: (item - 1) === selectedIndex }]"
                v-for="item in objectIds.length" v-text="item"
                @click.stop.prevent="onSelectedRow(item)"></li>
            </ul>
            <ul class="ids-wrapper" @click.self="onSelectedRow(-1)">
              <li
                :class="['id-item', { selected: index === selectedIndex }]"
                v-for="(item, index) in objectIds" v-text="item"
                @click.stop.prevent="onSelectedRow(index)"></li>
            </ul>
          </tab-panel>
        </tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Headroom from 'headroom.js'
import { Tabs, TabList, Tab, TabPanel } from '../../../components/Tabs'
import OptionsForm from './components/OptionsForm/OptionsForm'
import { generateObjectId } from '../../../utils/ObjectUtil'
import { GENERATE_OBJECTID_MAIN_NAVS } from './constants/navs'

const DEFALUT_CODE_TABS = {
  tab: 'results',
  panel: 'results-panel'
}

export default {
  data () {
    this.states = {
      params: this.$route.params
    }

    return {
      optionsTabs: {
        tab: 'options',
        panel: 'options-panel'
      },
      codeTabs: {...DEFALUT_CODE_TABS},
      demo: new Array(24).fill('0').join(),
      navs: GENERATE_OBJECTID_MAIN_NAVS,
      objectIds: [],
      isShowMetadata: false,
      isShowExamples: false,
      selectedIndex: -1
    }
  },
  methods: {
    onSelectCodeTab (value) {
      this.selectedIndex = -1;
      if (value && value.tab === 'examples') {
        this.isShowMetadata = false
        this.isShowExamples = false
        this.codeTabs = {...DEFALUT_CODE_TABS}
        return
      }
      this.codeTabs = value
    },
    onGenerateOIds ({ param, number, type }) {
      let i = 0
      const objectIds = []
      while (++i <= parseInt(number, 10)) {
        objectIds.push(generateObjectId(param))
      }

      this.selectedIndex = -1;
      this.objectIds = objectIds
    },
    onSelectedRow (index) {
      this.selectedIndex = index
    }
  },
  mounted () {
    const headroom = new Headroom(this.$refs.navbar, {
      tolerance: 5,
      offset: 105,
      classes: {
        initial: 'animated',
        pinned: 'slideDown',
        unpinned: 'slideUp'
      }
    })
    headroom.init()
    this.states.headroom = headroom

    const currentNav = this.navs.find(nav => nav.link.indexOf(this.states.params.type) > -1)
    if (currentNav) {
      this.demo = currentNav.demo
      this.objectIds = [this.demo]
    }
  },
  components: { Tabs, TabList, Tab, TabPanel, OptionsForm },
  destroyed () {
    if (this.states.headroom) {
      if (this.states.headroom.destroy) {
        this.states.headroom.destroy()
      } else {
        this.states.headroom = null
        delete this.states.headroom
      }
    }
  }
}
</script>

<style scoped lang="less">
@import './GenerateObjectIdMain';
</style>
