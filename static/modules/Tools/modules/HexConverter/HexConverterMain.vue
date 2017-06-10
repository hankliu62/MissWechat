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
                @change="onChangeCode"></textarea>
              <div class="btns-group">
                <button type="button" class="btn btn-default btn-theme" @click="onTransform">Transform</button>
                <button type="button" class="btn btn-default btn-theme" @click="onBeforeLoad">Load</button>
                <el-upload
                  class="btn btn-upload hk-upload"
                  accept="text/plain"
                  :action="states.uploadUrl"
                  :multiple="false"
                  :show-upload-list="false"
                  :before-upload="onBeforeUpload">
                  <button type="button" class="btn btn-default btn-theme">Upload</button>
                </el-upload>
                <!-- <upload
                  class="btn btn-upload"
                  :acceptTypes="['text/plain']"
                  @beforeUpload="console.log(123)"
                >
                  <button type="button" class="btn btn-default btn-theme">Upload</button>
                </upload> -->
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
              :selected="optionsTabs.tab === states.inputTab.headerId">
              <span :class="{httpsuccess: result.statusCode === 200, httperror: result.statusCode !== 200}">
                <i class="icon icon-circle"></i>
                <em v-text="' ' + result.statusCode + ' '"></em><span v-text="result.statusMessage"></span>
              </span>
            </tab>
          </tab-list>
          <tab-panel
            slot="tabpanel"
            :id="states.inputTab.bodyId"
            :selected="optionsTabs.panel === states.inputTab.bodyId">
            <ul class="codes" @click.self="onSelectedRow(-1)">
              <li
                :class="['code', 'code-' + (index + 1), { selected: index === selectedIndex }]"
                :style="{ top: (index * 20) + 'px' }"
                v-for="(row, index) in result.rows"
                v-if="result && result.rows"
                @click.stop.prevent="onSelectedRow(index)">
                <span v-text="row"></span>
              </li>
            </ul>
          </tab-panel>
        </tabs>
      </div>
    </div>

    <el-dialog
      title="Enter URL"
      v-model="isShowLoadDialog"
      size="tiny"
      custom-class="hk-dialog url-dialog"
      @close="onCloseLoadDialog">
      <div class="form-group">
        <input
          id="url"
          class="form-control input-theme"
          type="url"
          placeholder="Enter you url"
          autocomplete="off"
          v-model="loadUrl"
          @change="onChangeUrl">
      </div>
      <div slot="footer" class="btns-group dialog-footer">
        <button class="btn btn-default" @click="onCloseLoadDialog">Cancel</button>
        <button class="btn btn-default btn-theme" @click="onLoad">Load</button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { Tabs, TabList, Tab, TabPanel } from '../../../../components/Tabs'
import HeadroomNav from '../../../../components/HeadroomNav/HeadroomNav'
import Upload from '../../../../components/Upload/Upload'
import { PARAM_TYPES } from './constants/constants'
import config from '../../../../config/config'

export default {
  data () {
    this.states = {
      inputTab: {
        headerId: 'input-tab',
        bodyId: 'input-tab-panel'
      },
      params: this.$route.params,
      // uploadUrl: `http://localhost:3002/v1/api/upload/files`
      uploadUrl: `${config.service_domain}/v1/api/upload/files`
    }

    return {}
  },
  methods: {
    ...(mapActions(['convert', 'getLoadFileContent'])),
    setState: mapActions(['setHexConverterState'])['setHexConverterState'],
    onSelectedRow (index) {
      this.setState({ selectedIndex: index })
    },
    onTransform () {
      this.convert({ type: this.states.params.type, code: this.code })
    },
    onBeforeLoad () {
      this.setState({ isShowLoadDialog: true })
    },
    async onLoad () {
      await this.getLoadFileContent(this.loadUrl)
      this.setState({ isShowLoadDialog: false })
    },
    onBeforeUpload (file) {
      var reader = new window.FileReader()
      reader.onload = function (e) {
        this.setState({ code: e.target.result })
      }.bind(this)
      reader.readAsText(file)
      return false
    },
    onCloseLoadDialog () {
      this.setState({ isShowLoadDialog: false, loadUrl: '' })
    },
    onChangeCode (e) {
      this.setState({ code: e.target.value })
    },
    onChangeUrl (e) {
      this.setState({ loadUrl: e.target.value })
    }
  },
  computed: {
    ...mapState({
      isShowExamples: (state) => state.hexConverterMain.isShowExamples,
      isShowLoadDialog: (state) => state.hexConverterMain.isShowLoadDialog,
      selectedIndex: (state) => state.hexConverterMain.selectedIndex,
      code: (state) => state.hexConverterMain.code,
      loadUrl: (state) => state.hexConverterMain.loadUrl,
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
  components: { Tabs, TabList, Tab, TabPanel, HeadroomNav, Upload }
}
</script>

<style scoped lang="less">
@import './HexConverterMain';
</style>

<style lang="less">
@import '../../../../styles/components/hk-dialog';
@import '../../../../styles/components/hk-upload';
</style>
