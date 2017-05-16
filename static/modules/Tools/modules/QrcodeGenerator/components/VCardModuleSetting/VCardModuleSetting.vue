<template>
  <div class="vcard-setting-container">
    <module-item-setting
      :module="states.CONSTANTS.MODULE.Basic"
      v-if="states.CONSTANTS.MODULE.Basic === selectedModule">
      <div class="form-group vcard-setting-item">
        <label class="form-control-label">头像</label>
        <div class="form-control-content">
          <upload titles="Image files" extensions="jpeg,jpg,png,gif" @onUploadedFile="onUploadedAvatar">
            <button class="btn hk-btn btn-default" v-if="!vcard.avatar">上传头像</button>
            <exhibition-image :url="`${vcard.avatar}?imageView2/5/w/80/h/80`" v-if="vcard.avatar" @onClose="onClearAvatar" />
          </upload>
          <upload-vcard-avatar-modal
            :is-show="isShowUploadVCardAvatarModal"
            :url="uploadVcardAvatarModalImage"
            :onOk="onOkUploadVCardAvatar"
            :onClose="onCloseUploadVCardAvatarModal" />
        </div>
      </div>
      <div class="form-group vcard-setting-item">
        <label class="form-control-label">封面图</label>
        <div class="form-control-content">
          <button class="btn hk-btn btn-default" @click="onOpenUploadVCardCoverModal">选择封面图</button>
          <info-tip content="图片建议尺寸720*330px，居中展示建议尺寸720*450px" :hidden-tip="true" />

          <upload-vcard-cover-modal
            :is-show="isShowUploadVCardCoverModal"
            :url="uploadVcardCoverModalImage"
            :onOk="onSelectVCardCover"
            :onClose="onCloseUploadVCardCoverModal" />
        </div>
      </div>
      <div class="form-group vcard-setting-item">
        <label class="form-control-label">姓名</label>
        <div class="form-control-content">
          <count-input max-length="50" />
        </div>
      </div>
      <div class="form-group vcard-setting-item">
        <label class="form-control-label">职位</label>
        <div class="form-control-content">
          <count-input max-length="100" />
        </div>
      </div>
      <div class="form-group vcard-setting-item">
        <label class="form-control-label">公司</label>
        <div class="form-control-content">
          <count-input max-length="50" />
        </div>
      </div>
      <div class="form-group vcard-setting-item">
        <label class="form-control-label">展示位置</label>
        <ul class="form-control-content vcard-header-preview-layout">
          <li
            v-for="item in states.headerPreviewLayouts"
            :class="{ 'layout-item': true, [`layout-${item}`]: true, activated: selectedPreviewLayout === item }"
            @click="onSelectLayout(item)">
            <img class="layout-item-image" :src="require(`./images/layout-${item}.png`)" />
            <div class="selected-mask">
              <div class="icon-ok">&#10004</div>
            </div>
          </li>
        </ul>
      </div>
    </module-item-setting>
  </div>
</template>

<script>
import { VCARD_MODULE } from '../../constants/constants'
import ModuleItemSetting from './ModuleItemSettting'
import Upload from '../../../../../../components/Upload/Upload'
import InfoTip from '../../../../../../components/InfoTip/InfoTip'
import CountInput from '../../../../../../components/CountInput/CountInput'
import ExhibitionImage from '../../../../../../components/ExhibitionImage/ExhibitionImage'
import UploadVcardAvatarModal from '../UploadVCardAvatarModal/UploadVCardAvatarModal'
import UploadVcardCoverModal from '../UploadVCardCoverModal/UploadVCardCoverModal'

function closeUploadVCardAvatarModal (vm) {
  vm.isShowUploadVCardAvatarModal = false
  vm.uploadVcardAvatarModalImage = ''
}

function openUploadVCardAvatarModal (vm, url) {
  vm.isShowUploadVCardAvatarModal = true
  vm.uploadVcardAvatarModalImage = url
}

export default {
  data () {
    this.states = {
      CONSTANTS: {
        MODULE: VCARD_MODULE
      },
      headerPreviewLayouts: ['left', 'middle', 'right']
    }

    return {
      isShowUploadVCardCoverModal: false,
      isShowUploadVCardAvatarModal: false,
      uploadVcardCoverModalImage: '',
      uploadVcardAvatarModalImage: '',
      avatar: '',
      selectedPreviewLayout: 'left'
    }
  },
  props: {
    vcard: {
      type: Object,
      default: function () {
        return {}
      }
    },
    selectedModule: {
      type: String,
      default: 'basic'
    }
  },
  methods: {
    onUploadedAvatar (url, key) {
      openUploadVCardAvatarModal(this, url)
    },
    onOkUploadVCardAvatar (url) {
      if (!this.vcard) {
        this.vcard = {}
      }
      this.vcard.avatar = url
      this.onCloseUploadVCardAvatarModal()
    },
    onCloseUploadVCardAvatarModal () {
      closeUploadVCardAvatarModal(this)
    },
    onClearAvatar () {
      this.vcard = { ...this.vcard, avatar: '' }
    },
    onOpenUploadVCardCoverModal () {
      this.isShowUploadVCardCoverModal = true
    },
    onSelectVCardCover (url) {
      this.uploadVcardCoverModalImage = url;
      if (!this.vcard) {
        this.vcard = {}
      }
      this.vcard.cover = url

      this.onCloseUploadVCardCoverModal()
    },
    onCloseUploadVCardCoverModal (url) {
      this.isShowUploadVCardCoverModal = false
    },
    onSelectLayout (layout) {
      this.selectedPreviewLayout = layout
      this.vcard.headerLayout = layout
    }
  },
  components: {
    ModuleItemSetting,
    Upload,
    InfoTip,
    CountInput,
    UploadVcardAvatarModal,
    UploadVcardCoverModal,
    ExhibitionImage
  }
}
</script>

<style lang="less">
@import './VCardModuleSetting';
</style>

