<template>
  <div class="vcard-setting-container">
    <!-- 基本信息 -->
    <module-item-setting
      :top="selectedModuleTop"
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
            :url="`${uploadVCardAvatarModalImage}?imageView2/4/w/360`"
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
            <exhibition-image :url="`${vcard.cover.value}?imageView2/1/w/120/h/72`" @onClose="onClearVCardCover" @onClick="onOpenUploadVCardCoverModal" />
          </template>
          <template v-if="vcard.cover && vcard.cover.value && vcard.cover.type === states.CONSTANTS.PURE_TYPE">
            <div
              class="vcard-cover-display"
              :style="{backgroundColor: vcard.cover.value}"
              @click="onOpenUploadVCardCoverModal">
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
            @change="(value) => this.onChangeVCardProperty('name', value)" />
        </div>
      </div>
      <div class="form-group vcard-setting-item">
        <label class="form-control-label">职位</label>
        <div class="form-control-content">
          <count-input
            max-length="100"
            :model="vcard.appointment ? (vcard.appointment.value || '') : ''"
            @change="(value) => this.onChangeVCardProperty('appointment', value)" />
        </div>
      </div>
      <div class="form-group vcard-setting-item">
        <label class="form-control-label">公司</label>
        <div class="form-control-content">
          <count-input
            max-length="50"
            :model="vcard.company ? (vcard.company.value || '') : ''"
            @change="(value) => this.onChangeVCardProperty('company', value)" />
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

    <!-- 联系信息 -->
    <module-item-setting
      :top="selectedModuleTop"
      :module="states.CONSTANTS.MODULE.Contact"
      v-if="states.CONSTANTS.MODULE.Contact === selectedModule"
      @close="onSelecteModule('')">
      <div class="form-group vcard-setting-item">
        <label class="form-control-label">固定电话</label>
        <div class="form-control-content">
          <count-input
            max-length="20"
            :model="vcard.tel ? (vcard.tel.value || '') : ''"
            @change="(value) => this.onChangeVCardProperty('tel', value)" />
        </div>
      </div>
      <div class="form-group vcard-setting-item">
        <label class="form-control-label">移动电话</label>
        <div class="form-control-content">
          <count-input
            max-length="20"
            :model="vcard.phone ? (vcard.phone.value || '') : ''"
            @change="(value) => this.onChangeVCardProperty('phone', value)" />
        </div>
      </div>
      <div class="form-group vcard-setting-item">
        <label class="form-control-label">传真</label>
        <div class="form-control-content">
          <count-input
            max-length="20"
            :model="vcard.fax ? (vcard.fax.value || '') : ''"
            @change="(value) => this.onChangeVCardProperty('fax', value)" />
        </div>
      </div>
      <div class="form-group vcard-setting-item">
        <label class="form-control-label">电子邮箱</label>
        <div class="form-control-content">
          <count-input
            max-length="50"
            :model="vcard.email ? (vcard.email.value || '') : ''"
            @change="(value) => this.onChangeVCardProperty('email', value)" />
        </div>
      </div>
    </module-item-setting>

    <!-- 社交信息 -->
    <module-item-setting
      :top="selectedModuleTop"
      :module="states.CONSTANTS.MODULE.Account"
      v-if="states.CONSTANTS.MODULE.Account === selectedModule"
      @close="onSelecteModule('')">
      <div class="form-group vcard-setting-item">
        <label class="form-control-label">微信号</label>
        <div class="form-control-content">
          <count-input
            max-length="50"
            :model="vcard.wechat ? (vcard.wechat.value || '') : ''"
            @change="(value) => this.onChangeVCardProperty('wechat', value)" />
        </div>
      </div>
      <div class="form-group vcard-setting-item">
        <label class="form-control-label">主页网址</label>
        <div class="form-control-content">
          <count-input
            max-length="200"
            :model="vcard.website ? (vcard.website.value || '') : ''"
            @change="(value) => this.onChangeVCardProperty('website', value)" />
        </div>
      </div>
      <div class="form-group vcard-setting-item">
        <label class="form-control-label">微博</label>
        <div class="form-control-content">
          <count-input
            max-length="200"
            :model="vcard.weibo ? (vcard.weibo.value || '') : ''"
            @change="(value) => this.onChangeVCardProperty('weibo', value)" />
        </div>
      </div>
      <div class="form-group vcard-setting-item">
        <label class="form-control-label">QQ</label>
        <div class="form-control-content">
          <count-input
            max-length="50"
            :model="vcard.qq ? (vcard.qq.value || '') : ''"
            @change="(value) => this.onChangeVCardProperty('qq', value)" />
        </div>
      </div>
    </module-item-setting>

    <!-- 社交信息 -->
    <module-item-setting
      :top="selectedModuleTop"
      :module="states.CONSTANTS.MODULE.Address"
      v-if="states.CONSTANTS.MODULE.Address === selectedModule"
      @close="onSelecteModule('')">
      <div class="form-group vcard-setting-item">
        <label class="form-control-label">地址</label>
        <div class="form-control-content">
          <regions type="local" @change="onChangeVCardAddressRegions" />

          <count-input
            max-length="50"
            :model="vcard.address ? (vcard.address.value.town || '') : ''"
            @change="onChangeVCardAddressTown" />
          <div class="btn-marker-address">
            <info-tip
              type="map-marker"
              content="标注地址"
              :hidden-tip="true"
              @onClick="onOpenMarkAddressModal" />
          </div>

            <mark-address-modal
              :is-show="isShowMarkAddressModal"
              :address="vcard.address.value"
              :onOk="onMarkVCardAddress"
              :onClose="onCloseMarkAddressModal" />
        </div>
      </div>
    </module-item-setting>

    <!-- 社交信息 -->
    <module-item-setting
      :top="selectedModuleTop"
      :module="states.CONSTANTS.MODULE.Explanation"
      v-if="states.CONSTANTS.MODULE.Explanation === selectedModule"
      @close="onSelecteModule('')">
      <div class="form-group vcard-setting-item">
        <label class="form-control-label">个人说明</label>
        <div class="form-control-content">
          <autosize-textarea
            max-length="50"
            :model="vcard.explanation ? (vcard.explanation.value || '') : ''"
            @change="(value) => this.onChangeVCardProperty('explanation', value)"
            :textStyle="{maxHeight: '102px'}"
            :maxLength="200" />
        </div>
      </div>
    </module-item-setting>
  </div>
</template>

<script>
import {
  VCARD_MODULE,
  VCARD_COVER_IMAGE_TYPE,
  VCARD_COVER_PURE_TYPE,
  VCARD_PREVIEW_LAYOUTS,
  VCARD_PREVIEW_LAYOUT_LEFT,
  VCARD_PREVIEW_LAYOUT_MIDDLE,
  VCARD_PREVIEW_LAYOUT_RIGHT
} from '../../constants/constants'
import ModuleItemSetting from './ModuleItemSettting'
import Upload from '../../../../../../components/Upload/Upload'
import Regions from '../../../../../../components/Regions/Regions'
import InfoTip from '../../../../../../components/InfoTip/InfoTip'
import CountInput from '../../../../../../components/CountInput/CountInput'
import MaskRemove from '../../../../../../components/MaskRemove/MaskRemove'
import ExhibitionImage from '../../../../../../components/ExhibitionImage/ExhibitionImage'
import AutosizeTextarea from '../../../../../../components/AutosizeTextarea/AutosizeTextarea'
import UploadVcardAvatarModal from '../UploadVCardAvatarModal/UploadVCardAvatarModal'
import UploadVcardCoverModal from '../UploadVCardCoverModal/UploadVCardCoverModal'
import MarkAddressModal from '../MarkAddressModal/MarkAddressModal'
import ObjectUtil from '../../../../../../utils/ObjectUtil'

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
      headerPreviewLayouts: VCARD_PREVIEW_LAYOUTS
    }

    return {
      vcard: ObjectUtil.cloneDeep(this.vcardData),
      isShowUploadVCardCoverModal: false,
      isShowUploadVCardAvatarModal: false,
      isShowMarkAddressModal: false,
      uploadVCardAvatarModalImage: '',
      selectedPreviewLayout: VCARD_PREVIEW_LAYOUT_LEFT
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
    },
    selectedModuleTop: {
      type: Number,
      default: 0
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
    onCloseUploadVCardCoverModal (url) {
      this.isShowUploadVCardCoverModal = false
    },
    onSelectVCardCover (value, type) {
      this.updateVCardProperty({ value, type }, 'cover')
      this.updateVCardProperty({ value, type }, 'lastCover')
      this.onTriggerSession()
      this.onCloseUploadVCardCoverModal()
    },
    onOpenMarkAddressModal () {
      this.isShowMarkAddressModal = true
    },
    onCloseMarkAddressModal () {
      this.isShowMarkAddressModal = false
    },
    onMarkVCardAddress (position) {
      this.onCloseMarkAddressModal()
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
    onChangeVCardProperty (key, value) {
      this.updateVCardProperty(value, key, 'value')
      this.onTriggerSession()
    },
    onTriggerSession () {
      this.$emit('onUpdateVCard', this.vcard)
    },
    onSelecteModule (module) {
      this.$emit('onSelecteModule', module)
    },
    onChangeVCardAddressRegions ([province, city, county]) {
      const defaultAddress = { value: {town: ''} }
      const value = { ...(this.vcard.address || defaultAddress).value, province, city, county }
      this.onChangeVCardProperty('address', value)
    },
    onChangeVCardAddressTown (town) {
      const defaultAddress = { value: {province: '', city: '', county: ''} }
      const value = { ...(this.vcard.address || defaultAddress).value, town }
      this.onChangeVCardProperty('address', value)
    }
  },
  watch: {
    vcardData (val) {
      val = val || {}
      this.vcard = ObjectUtil.cloneDeep(val)
      if (this.vcard.headerLayout) {
        this.selectedPreviewLayout = this.vcard.headerLayout
      }
    }
  },
  components: {
    Upload,
    Regions,
    InfoTip,
    CountInput,
    MaskRemove,
    ExhibitionImage,
    AutosizeTextarea,
    ModuleItemSetting,
    MarkAddressModal,
    UploadVcardCoverModal,
    UploadVcardAvatarModal
  }
}
</script>

<style lang="less">
@import './VCardModuleSetting';
</style>

