<template>
  <div class="qrcode-container">
    <div class="navbar">
      <div class="navbar-header">二维码生成器</div>
      <div role="navigation" id="navs" class="nav-collapse">
        <ul class="navs-wrapper">
          <li
            v-for="item in nav.items"
            :class="['nav', { active: item.link.indexOf(states.params.type) >= 0 }]">
            <a :href="item.link" v-text="item.name"></a>
          </li>
        </ul>
      </div>
      <a href="#nav" class="nav-toggle">
        <svg class="icon hidden" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
        </svg>
      </a>
    </div>
    <header class="header header-fixed">
      <div class="background-mask"></div>
      <div class="content">
        <h1 class="title">Qrcode Genetator</h1>
        <p class="desc">The most professional qrcode online generate site, can be simple and efficient to help you achieve the requirements of qrcode production.</p>
      </div>
    </header>
    <div class="container-fluid main-content-view">
      <div class="row ov main-content">
        <div class="brace left-brace col-md-1"></div>
        <div class="main-content-wrap col-md-10">
          <template v-if="states.params.type !== CONSTANTS.PARAM_TYPES.VCARD">
            <div class="qrcode-generate-box">
              <div class="qrcode-generate-wrap">
                <qrcode-generate-form
                  @generate="onGenerateQrcode"
                  :btnText="generateBtnText"
                  :isShowBtn="states.params.type !== CONSTANTS.PARAM_TYPES.WECHAT">
                  <template v-if="states.params.type === CONSTANTS.PARAM_TYPES.TEXT">
                    <text-qrcode-generate
                      :qrcodeContent="qrcodeContent"
                      :isShowEditor="isShowEditor"
                      @onToggleIsShowEditor="onToggleIsShowEditor"
                      @onChangeContent="onChangeContent">
                    </text-qrcode-generate>
                  </template>
                  <template v-if="states.params.type === CONSTANTS.PARAM_TYPES.URL">
                    <url-qrcode-generate
                      :qrcodeContent="qrcodeContent"
                      @onChangeContent="onChangeContent">
                    </url-qrcode-generate>
                  </template>
                  <template v-if="states.params.type === CONSTANTS.PARAM_TYPES.FILE">
                    <file-qrcode-generate
                      :qrcodeContent="qrcodeContent"
                      :isShowEditor="isShowEditor"
                      @onToggleIsShowEditor="onToggleIsShowEditor"
                      @onChangeContent="onChangeContent">
                    </file-qrcode-generate>
                  </template>
                  <template v-if="states.params.type === CONSTANTS.PARAM_TYPES.IMAGE">
                    <image-qrcode-generate
                      :qrcodeContent="qrcodeContent"
                      :isShowEditor="isShowEditor"
                      @onToggleIsShowEditor="onToggleIsShowEditor"
                      @onChangeContent="onChangeContent">
                    </image-qrcode-generate>
                  </template>
                  <template v-if="states.params.type === CONSTANTS.PARAM_TYPES.WECHAT">
                    <wechat-qrcode-generate
                      :qrcodeContent="qrcodeContent"
                      @onChangeContent="onChangeContent"
                      @generate="onGenerateQrcode">
                    </wechat-qrcode-generate>
                  </template>
                </qrcode-generate-form>
              </div>
              <div class="qrcode-preview-wrap">
                <qrcode-preview :url="qrcodeUrl" @download="onDownloadQrcode"></qrcode-preview>
                <qrcode-tools
                  v-if="states.params.type !== CONSTANTS.PARAM_TYPES.WECHAT"
                  :faultToleranceLevel="faultToleranceLevel"
                  :size="size"
                  :foreground="foreground"
                  :background="background"
                  :logoUrl="logoUrl"
                  @onSetLevel="onSetLevel"
                  @onSetSize="onSetSize"
                  @onSetForeground="onSetForeground"
                  @onSetBackground="onSetBackground"
                  @onSetLogoUrl="onSetLogoUrl">
                </qrcode-tools>
              </div>
            </div>
          </template>
          <template v-if="states.params.type === CONSTANTS.PARAM_TYPES.VCARD">
            <div class="vcard-qrcode-wrap">
              <div class="left-wrap">
                <div class="vcard-preview-container">
                  <div class="vcard-preview-item vcard-preview-basic">
                    <div class="bg-wrap">
                      <upload-vcard-avatar-modal></upload-vcard-avatar-modal>
                    </div>
                  </div>
                  <div class="vcard-preview-item vcard-preview-basic"></div>
                  <div class="vcard-preview-item vcard-preview-basic"></div>
                  <div class="vcard-preview-item vcard-preview-basic"></div>
                  <div class="vcard-preview-item vcard-preview-basic"></div>
                </div>
                <div class="vcard-language-container">
                  <label class="language-label">显示语言: </label>
                  <radio
                    v-for="option in CONSTANTS.LANGUAGES_OPTIONS"
                    :label="option.value"
                    :model="qrcodeContent[CONSTANTS.PARAM_TYPES.VCARD].language"
                    @onChange="onChangeVCardLanguage">
                    <span v-text="option.text"></span>
                  </radio>
                </div>
              </div>
              <div class="right-wrap"></div>
            </div>
          </template>
        </div>
        <div class="brace right-brace col-md-1"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Radio from '../../../../components/Radio/Radio'
import QrcodeGenerateForm from './components/QrcodeGenerateForm/QrcodeGenerateForm'
import TextQrcodeGenerate from './components/TextQrcodeGenerate/TextQrcodeGenerate'
import UrlQrcodeGenerate from './components/UrlQrcodeGenerate/UrlQrcodeGenerate'
import FileQrcodeGenerate from './components/FileQrcodeGenerate/FileQrcodeGenerate'
import ImageQrcodeGenerate from './components/ImageQrcodeGenerate/ImageQrcodeGenerate'
import WechatQrcodeGenerate from './components/WechatQrcodeGenerate/WechatQrcodeGenerate'
import QrcodePreview from './components/QrcodePreview/QrcodePreview'
import QrcodeTools from './components/QrcodeTools/QrcodeTools'
import UploadVcardAvatarModal from './components/UploadVCardAvatarModal/UploadVCardAvatarModal'
import { PARAM_TYPES } from './constants/constants'
import { LANGUAGES_OPTIONS } from '../../../../constants/languages'
import DownloadUtil from '../../../../utils/DownloadUtil'
import RegExpUtil from '../../../../utils/RegExpUtil'
import { Notification } from '../../../../services'

const validateContent = function (vm) {
  let isValided = true
  const { type } = vm.states.params
  const content = vm.qrcodeContent[type]
  const isShowEditor = vm.isShowEditor
  let value = ''
  switch (type) {
    case PARAM_TYPES.TEXT:
      value = isShowEditor ? content.html : content.text
      if (!RegExpUtil.testRequired(value)) {
        Notification.service({content: '请输入二维码内容！', type: 'error'})
        isValided = false
      }
      break
    case PARAM_TYPES.URL:
      value = content
      if (!RegExpUtil.test(['required', 'url'], value)) {
        Notification.service({content: '请输入正确的二维码网址！', type: 'error'})
        isValided = false
      }
      break
    case PARAM_TYPES.FILE:
      value = content
      if (!RegExpUtil.testRequired(value.file.url)) {
        Notification.service({content: '请先上传文件', type: 'error'})
        isValided = false
      }
      break
    case PARAM_TYPES.IMAGE:
      value = content
      if (!RegExpUtil.testRequired(value.image.url)) {
        Notification.service({content: '请先上传图片', type: 'error'})
        isValided = false
      }
      break
    case PARAM_TYPES.WECHAT:
      value = content
      if (!RegExpUtil.testRequired(value.public.name)) {
        Notification.service({content: '请输入二维码内容！', type: 'error'})
        isValided = false
      }
      break
    default:
      isValided = true
  }
  return isValided
}

const getQrcodeOptions = function (vm) {
  const options = {
    render: 'canvas',
    size: vm.size,
    correctLevel: vm.faultToleranceLevel,
    background: vm.background,
    foreground: vm.foreground
  }

  if (vm.logoUrl) {
    options.image = vm.logoUrl
    options.imageSize = 50
  }

  return options
}

export default {
  data () {
    this.states = {
      params: this.$route.params
    }

    this.CONSTANTS = {
      PARAM_TYPES,
      LANGUAGES_OPTIONS
    }

    return {}
  },
  computed: {
    ...mapState({
      nav: (state) => state.qrcodeGeneratorMain.nav,
      qrcodeUrl: (state) => state.qrcodeGeneratorMain.qrcodeUrl,
      faultToleranceLevel: (state) => state.qrcodeGeneratorMain.faultToleranceLevel,
      size: (state) => state.qrcodeGeneratorMain.size,
      foreground: (state) => state.qrcodeGeneratorMain.foreground,
      background: (state) => state.qrcodeGeneratorMain.background,
      logoUrl: (state) => state.qrcodeGeneratorMain.logoUrl,
      isShowEditor: (state) => state.qrcodeGeneratorMain.isShowEditor,
      qrcodeContent: (state) => state.qrcodeGeneratorMain.qrcodeContent
    }),
    generateBtnText () {
      return this.isGenerateLiveQrcode ? '生成活码' : '生成二维码'
    },
    isGenerateLiveQrcode () {
      const { states, isShowEditor } = this
      const { type } = states.params
      return [PARAM_TYPES.FILE, PARAM_TYPES.IMAGE, PARAM_TYPES.WECHAT].includes(type) || isShowEditor
    }
  },
  mounted () {
    this.fetchQiniuUptoken()
    const ResponsiveNav = require('responsive-nav')
    var navigation = ResponsiveNav('navs', {
      customToggle: '.nav-toggle',
      jsClass: 'qrcode-html',
      navActiveClass: 'qrcode-html-navs-toggled'
    })
  },
  methods: {
    setState: mapActions(['setQrcodeGeneratorState'])['setQrcodeGeneratorState'],
    ...mapActions(['fetchQiniuUptoken', 'generateTextQrcode', 'generateLiveQrcode']),
    onGenerateQrcode () {
      if (!validateContent(this)) {
        return
      }

      const { isGenerateLiveQrcode } = this
      if (isGenerateLiveQrcode) {
        this.onGenerateLiveQrcode()
        return
      }

      const { qrcodeContent, states } = this
      const { type } = states.params
      const content = qrcodeContent[type]
      let text = content

      switch (type) {
        case PARAM_TYPES.TEXT:
          text = content.text
          break
        case PARAM_TYPES.URL:
          if (!RegExpUtil.testUrlProtocol(text)) {
            text = `http://${content}`
            this.onChangeContent({ ...qrcodeContent, [PARAM_TYPES.URL]: text })
          }
          break
        default:
          break
      }

      const options = getQrcodeOptions(this)
      options.text = text
      this.generateTextQrcode(options)
    },
    async onGenerateLiveQrcode () {
      const { type } = this.states.params
      const options = getQrcodeOptions(this)
      this.generateLiveQrcode({ options, type })
    },
    onChangeContent (qrcodeContent) {
      this.setState({ qrcodeContent })
    },
    onToggleIsShowEditor () {
      const { isShowEditor, qrcodeContent, states } = this
      const { type } = states.params
      const content = { ...qrcodeContent[type] }
      if (isShowEditor) {
        switch (type) {
          case PARAM_TYPES.TEXT:
            content.text = RegExpUtil.removeHTMLTags(content.html)
            break
          default:
            break
        }
      }
      this.setState({ isShowEditor: !this.isShowEditor, qrcodeContent: { ...qrcodeContent, [type]: content } })
    },
    onDownloadQrcode () {
      const index = this.qrcodeUrl.lastIndexOf('/') + 1
      const filename = this.qrcodeUrl.slice(index)
      DownloadUtil.download(this.qrcodeUrl, filename)
    },
    onSetLevel (faultToleranceLevel) {
      this.setState({ faultToleranceLevel })
    },
    onSetSize (size) {
      this.setState({ size })
    },
    onSetForeground (foreground) {
      this.setState({ foreground })
    },
    onSetBackground (background) {
      this.setState({ background })
    },
    onSetLogoUrl (logoUrl) {
      this.setState({ logoUrl })
    },
    onChangeVCardLanguage (value) {
      const { qrcodeContent } = this
      const { vcard, othersQrcodeContent } = qrcodeContent
      const vcardQrcodeContent = { ...vcard }
      vcardQrcodeContent.language = value
      this.setState({ qrcodeContent: { ...othersQrcodeContent, vcard: vcardQrcodeContent } })
    }
  },
  components: {
    QrcodeGenerateForm,
    TextQrcodeGenerate,
    UrlQrcodeGenerate,
    FileQrcodeGenerate,
    ImageQrcodeGenerate,
    WechatQrcodeGenerate,
    QrcodePreview,
    QrcodeTools,
    Radio,
    UploadVcardAvatarModal
  }
}
</script>

<style scoped lang="less">
@import './QrcodeGeneratorMain';
</style>
