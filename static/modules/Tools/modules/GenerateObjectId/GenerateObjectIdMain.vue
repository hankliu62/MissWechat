<template>
  <div class="goid-container">
    <headroom-nav :nav="nav"></headroom-nav>
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
            <tab
              id="results"
              panelId="results-panel"
              slot="tab"
              :selected="codeTabs.tab === 'results'"
              :index="0">
              <span :class="{httpsuccess: result.statusCode === 200, httperror: result.statusCode !== 200}">
                <i class="icon icon-circle"></i>
                <em v-text="' ' + result.statusCode + ' '"></em><span v-text="result.statusMessage"></span>
              </span>
            </tab>
            <tab
              id="metadata"
              panelId="metadata-panel"
              slot="tab"
              v-if="isShowMetadata"
              :selected="codeTabs.tab === 'metadata'"
              :index="1">
              Metadata
            </tab>
            <tab
              id="examples"
              panelId="examples-panel"
              slot="tab"
              class="tab-examples"
              v-if="isShowExamples"
              :selected="codeTabs.tab === 'examples'"
              :index="3">
              <span class="for-example">
                <i class="glyphicon glyphicon-circle-arrow-left"></i>
                <span> to examples</span>
              </span>
            </tab>
          </tab-list>

          <tab-panel
            id="results-panel"
            slot="tabpanel"
            :selected="codeTabs.panel === 'results-panel'"
            :index="0">
            <ul class="rows-wrapper" @click.self="onSelectedRow(-1)">
              <li
                :class="['row-item', { selected: (item - 1) === selectedIndex }]"
                v-for="item in result.rows.length" v-text="item"
                @click.stop.prevent="onSelectedRow(item)"></li>
            </ul>
            <ul class="ids-wrapper" @click.self="onSelectedRow(-1)">
              <li
                :class="['id-item', { selected: index === selectedIndex }]"
                v-for="(item, index) in result.rows" v-text="item"
                @click.stop.prevent="onSelectedRow(index)"></li>
            </ul>
          </tab-panel>
          <tab-panel
            id="metadata-panel"
            slot="tabpanel"
            v-if="isShowMetadata"
            :selected="codeTabs.panel === 'metadata-panel'"
            :index="1">
            <ul class="rows-wrapper" @click.self="onSelectedRow(-1)">
              <li
                v-if="metadatas[states.params.type]"
                :class="['row-item', { selected: (item - 1) === selectedIndex }]"
                v-for="item in metadatas[states.params.type].rows.length" v-text="item"
                @click.stop.prevent="onSelectedRow(item)"></li>
            </ul>
            <ul class="ids-wrapper" @click.self="onSelectedRow(-1)">
              <li
                v-if="metadatas[states.params.type]"
                :class="['id-item', { selected: index === selectedIndex }]"
                v-for="(item, index) in metadatas[states.params.type].rows" v-html="item"
                @click.stop.prevent="onSelectedRow(index)"></li>
            </ul>
          </tab-panel>
          <tab-panel
            id="examples-panel"
            slot="tabpanel"
            v-if="isShowExamples"
            :selected="codeTabs.panel === 'examples-panel'"
            :index="2">
            <ul class="rows-wrapper" @click.self="onSelectedRow(-1)">
              <li
                :class="['row-item', { selected: (item - 1) === selectedIndex }]"
                v-for="item in example.rows.length" v-text="item"
                @click.stop.prevent="onSelectedRow(item)"></li>
            </ul>
            <ul class="ids-wrapper" @click.self="onSelectedRow(-1)">
              <li
                :class="['id-item', { selected: index === selectedIndex }]"
                v-for="(item, index) in example.rows" v-text="item"
                @click.stop.prevent="onSelectedRow(index)"></li>
            </ul>
          </tab-panel>
        </tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import OptionsForm from './components/OptionsForm/OptionsForm'
import HeadroomNav from '../../../../components/HeadroomNav/HeadroomNav'
import { Tabs, TabList, Tab, TabPanel } from '../../../../components/Tabs'
import { DEFALUT_CODE_TABS, SUCCESS_RESULT } from './constants/constants'

export default {
  data () {
    this.states = {
      params: this.$route.params
    }
    return {}
  },
  methods: {
    ...mapActions(['createObjectIds']),
    setState: mapActions(['setGeneratorState'])['setGeneratorState'],
    onSelectCodeTab (tab) {
      this.setState({selectedIndex: -1})
      if (tab && tab.id === 'examples') {
        this.setState({
          codeTabs: {...DEFALUT_CODE_TABS},
          isShowMetadata: false,
          isShowExamples: false,
          result: { ...SUCCESS_RESULT, rows: [this.demo] }
        })
        return
      }
      this.setState({codeTabs: { tab: tab.id, panel: tab.panelId }})
    },
    onGenerateOIds ({ param, number, type }) {
      this.createObjectIds({ param, number, type })
    },
    onSelectedRow (index) {
      this.setState({selectedIndex: index})
    }
  },
  computed: {
    ...mapState({
      optionsTabs: state => state.generateIdMain.optionsTabs,
      codeTabs: state => state.generateIdMain.codeTabs,
      demo: state => state.generateIdMain.demo,
      navs: state => state.generateIdMain.navs,
      result: state => state.generateIdMain.result,
      isShowMetadata: state => state.generateIdMain.isShowMetadata,
      isShowExamples: state => state.generateIdMain.isShowExamples,
      selectedIndex: state => state.generateIdMain.selectedIndex,
      example: state => state.generateIdMain.example,
      metadatas: state => state.generateIdMain.metadatas
    }),
    nav () {
      return {
        items: this.navs,
        title: 'ObjectID Generator'
      }
    }
  },
  mounted () {
    const currentNav = this.navs.find(nav => nav.link.indexOf(this.states.params.type) > -1)
    if (currentNav) {
      this.setState({ demo: currentNav.demo, result: { ...SUCCESS_RESULT, rows: [currentNav.demo] } })
    }
  },
  components: { Tabs, TabList, Tab, TabPanel, OptionsForm, HeadroomNav }
}
</script>

<style scoped lang="less">
@import './GenerateObjectIdMain';
</style>
