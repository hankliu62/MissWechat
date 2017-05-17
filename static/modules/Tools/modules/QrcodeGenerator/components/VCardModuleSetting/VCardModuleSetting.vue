<template>
  <div class="vcard-setting-container">
    <module-item-setting
      :module="states.CONSTANTS.MODULE.Basic"
      v-if="states.CONSTANTS.MODULE.Basic === selectedModule"
      @close="onSelecteModule('')">
      <div class="form-group vcard-setting-item">
        <label class="form-control-label">头像</label>
        <div class="form-control-content">
          <upload titles="Image files" extensions="jpeg,jpg,png,gif" @onUploadedFile="onUploadedAvatar">
            <button class="btn hk-btn btn-default" v-if="!vcard.avatar">上传头像</button>
            <exhibition-image :url="`${vcard.avatar}?imageView2/5/w/80/h/80`" v-if="vcard.avatar" @onClose="onClearAvatar" />
          </upload>
          <upload-vcard-avatar-modal
            :is-show="isShowUploadVCardAvatarModal"
            :url="uploadVCardAvatarModalImage"
            :onOk="onOkUploadVCardAvatar"
            :onClose="onCloseUploadVCardAvatarModal" />
        </div>
      </div>
      <div class="form-group vcard-setting-item">
        <label class="form-control-label">封面图</label>
        <div class="form-control-content">
          <button
            class="btn hk-btn btn-default"
            @click="onOpenUploadVCardCoverModal"
            v-if="!vcard.cover || !vcard.cover.value">选择封面图</button>

          <template v-if="vcard.cover && vcard.cover.value && vcard.cover.type === states.CONSTANTS.IMAGE_TYPE">
            <exhibition-image :url="`${vcard.cover.value}?imageView2/1/w/120/h/72`" @onClose="onClearVCardCover" />
          </template>
          <template v-if="vcard.cover && vcard.cover.value && vcard.cover.type === states.CONSTANTS.PURE_TYPE">
            <div class="vcard-cover-display" :style="{backgroundColor: vcard.cover.value}">
              <mask-remove @onRemove="onClearVCardCover" />
            </div>
          </template>

          <info-tip content="图片建议尺寸720*330px，居中展示建议尺寸720*450px" :hidden-tip="true" />

          <upload-vcard-cover-modal
            :is-show="isShowUploadVCardCoverModal"
            :selectedCover="vcard.cover"
            :onOk="onSelectVCardCover"
            :onClose="onCloseUploadVCardCoverModal" />
        </div>
      </div>
      <div class="form-group vcard-setting-item">
        <label class="form-control-label">姓名</label>
        <div class="form-control-content">
          <count-input
            max-length="50"
            placeholder="必填"
            :model="vcard.name ? (vcard.name.value || '') : ''"
            @change="onChangeName" />
        </div>
      </div>
      <div class="form-group vcard-setting-item">
        <label class="form-control-label">职位</label>
        <div class="form-control-content">
          <count-input
            max-length="100"
            :model="vcard.appointment ? (vcard.appointment.value || '') : ''"
            @change="onChangeAppointment" />
        </div>
      </div>
      <div class="form-group vcard-setting-item">
        <label class="form-control-label">公司</label>
        <div class="form-control-content">
          <count-input
            max-length="50"
            :model="vcard.company ? (vcard.company.value || '') : ''"
            @change="onChangeCompany" />
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
import { VCARD_MODULE, VCARD_COVER_IMAGE_TYPE, VCARD_COVER_PURE_TYPE } from '../../constants/constants'
import ModuleItemSetting from './ModuleItemSettting'
import Upload from '../../../../../../components/Upload/Upload'
import InfoTip from '../../../../../../components/InfoTip/InfoTip'
import CountInput from '../../../../../../components/CountInput/CountInput'
import MaskRemove from '../../../../../../components/MaskRemove/MaskRemove'
import ExhibitionImage from '../../../../../../components/ExhibitionImage/ExhibitionImage'
import UploadVcardAvatarModal from '../UploadVCardAvatarModal/UploadVCardAvatarModal'
import UploadVcardCoverModal from '../UploadVCardCoverModal/UploadVCardCoverModal'
import * as ObjectUtil from '../../../../../../utils/ObjectUtil'

function closeUploadVCardAvatarModal (vm) {
  vm.isShowUploadVCardAvatarModal = false
  vm.uploadVCardAvatarModalImage = ''
}

function openUploadVCardAvatarModal (vm, url) {
  vm.isShowUploadVCardAvatarModal = true
  vm.uploadVCardAvatarModalImage = url
}

function updateObjectProperty (vm, value, ...keys) {
  if (!vm.vcard) {
    vm.vcard = {}
  }

  if (!keys || keys.length === 0) {
    return
  }

  const firstChildKey = keys[0]
  const firstChildValue = ObjectUtil.set(vm.vcard[firstChildKey] || {}, value, ...keys.slice(1))
  vm.vcard = { ...vm.vcard, [firstChildKey]: firstChildValue }
}

export default {
  data () {
    this.states = {
      CONSTANTS: {
        MODULE: VCARD_MODULE,
        IMAGE_TYPE: VCARD_COVER_IMAGE_TYPE,
        PURE_TYPE: VCARD_COVER_PURE_TYPE
      },
      headerPreviewLayouts: ['left', 'middle', 'right']
    }

    return {
      vcard: this.vcardData,
      isShowUploadVCardCoverModal: false,
      isShowUploadVCardAvatarModal: false,
      uploadVCardAvatarModalImage: '',
      selectedPreviewLayout: 'left'
    }
  },
  props: {
    vcardData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    selectedModule: {
      type: String,
      default: ''
    }
  },
  methods: {
    updateVCardProperty (value, ...keys) {
      updateObjectProperty(this, value, ...keys)
    },
    onUploadedAvatar (url, key) {
      openUploadVCardAvatarModal(this, url)
    },
    onOkUploadVCardAvatar (url) {
      this.updateVCardProperty(url, 'avatar')
      this.onTriggerSession()
      this.onCloseUploadVCardAvatarModal()
    },
    onCloseUploadVCardAvatarModal () {
      closeUploadVCardAvatarModal(this)
    },
    onClearAvatar () {
      this.updateVCardProperty('', 'avatar')
      this.onTriggerSession()
    },
    onOpenUploadVCardCoverModal () {
      this.isShowUploadVCardCoverModal = true
    },
    onSelectVCardCover (value, type) {
      this.updateVCardProperty({ value, type }, 'cover')
      this.onTriggerSession()
      this.onCloseUploadVCardCoverModal()
    },
    onCloseUploadVCardCoverModal (url) {
      this.isShowUploadVCardCoverModal = false
    },
    onSelectLayout (layout) {
      this.selectedPreviewLayout = layout
      this.updateVCardProperty(layout, 'headerLayout')
      this.onTriggerSession()
    },
    onClearVCardCover () {
      this.updateVCardProperty({}, 'cover')
      this.onTriggerSession()
    },
    onChangeName (value) {
      this.updateVCardProperty(value, 'name', 'value')
      this.onTriggerSession()
    },
    onChangeAppointment (value) {
      this.updateVCardProperty(value, 'appointment', 'value')
      this.onTriggerSession()
    },
    onChangeCompany (value) {
      this.updateVCardProperty(value, 'company', 'value')
      this.onTriggerSession()
    },
    onTriggerSession () {
      this.$emit('onUpdateVCard', this.vcard)
    },
    onSelecteModule (module) {
      this.$emit('onSelecteModule', module)
    }
  },
  watch: {
    vcardData (val) {
      val = val || {}
      this.vcard = { ...val }
      if (this.vcard.headerLayout) {
        this.this.selectedPreviewLayout = this.vcard.headerLayout
      }
    }
  },
  components: {
    Upload,
    InfoTip,
    CountInput,
    MaskRemove,
    ExhibitionImage,
    ModuleItemSetting,
    UploadVcardCoverModal,
    UploadVcardAvatarModal
  }
}
</script>

<style lang="less">
@import './VCardModuleSetting';
</style>

