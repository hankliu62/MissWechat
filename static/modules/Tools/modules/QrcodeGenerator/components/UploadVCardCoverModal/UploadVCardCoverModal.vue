<template>
  <modal
    title="选择封面图"
    :is-show="isShow"
    :default-footer="true"
    custom-class="upload-cover-modal"
    :onOk="onSureCover"
    :onClose="onClose">
    <div slot="body" class="upload-cover-modal-body" v-if="isShow">
      <div class="default-covers">
        <div class="default-covers-header">
          <label class="covers-header-label">预设背景</label>
          <radio
            v-for="option in states.CONSTANTS.DEFAULT_COVER_TYPES"
            :label="option.value"
            :model="selectedCoverType"
            @onChange="onChangeVCardCoverPaneType">
            <span v-text="option.text"></span>
          </radio>
        </div>
        <div class="default-covers-list">
          <ul
            class="default-covers-group"
            v-for="covers in states.CONSTANTS.DEFAULT_IMAGE_COVERS"
            v-if="selectedCoverType === states.CONSTANTS.IMAGE_TYPE">
            <li
              class="default-covers-item default-covers-image"
              v-for="cover in covers"
              @click="onSelectCover(cover)">
              <img class="cover-image" :src="`${cover}?imageView2/1/w/120/h/72`" />
              <mask-ok v-if="selectingCover === cover" />
            </li>
          </ul>
          <ul
            class="default-covers-group"
            v-for="covers in states.CONSTANTS.DEFAULT_PURE_COVERS"
            v-if="selectedCoverType === states.CONSTANTS.PURE_TYPE">
            <li
              class="default-covers-item default-covers-pure"
              v-for="cover in covers"
              :style="{backgroundColor: cover}"
              @click="onSelectCover(cover)">
              <mask-ok v-if="(selectingCover === cover) && !checkedCustomColor" />
            </li>
          </ul>
        </div>
      </div>
      <!-- 图片背景 -->
      <template v-if="selectedCoverType === states.CONSTANTS.IMAGE_TYPE">
        <div class="upload-covers">
          <div class="upload-covers-header">
            <label class="covers-header-label">自定义背景</label>
          </div>
          <upload titles="Image files" extensions="jpeg,jpg,png,gif" @onUploadedFile="onUploadedImageCover">
            <button class="btn hk-btn btn-default btn-upload">本地上传</button>
          </upload>
          <div class="upload-covers-item" v-if="uploadCover" @click="onSelectCover(uploadCover)">
            <img class="cover-image" :src="`${uploadCover}?imageView2/1/w/120/h/72`" />
            <mask-ok v-if="selectingCover === uploadCover" />
            <mask-remove @onRemove="onRemoveUploadCover" />
          </div>
        </div>
      </template>

      <!-- 纯色背景 -->
      <template v-if="selectedCoverType === states.CONSTANTS.PURE_TYPE">
        <div class="upload-covers upload-covers-type-pure">
          <div class="upload-covers-header">
            <checkbox v-model="checkedCustomColor">
              <label class="covers-header-label">自定义颜色</label>
            </checkbox>
          </div>
          <color-picker :value="selectedPickerPureColor" @submit="onChoosePickerPureColor" />
        </div>
      </template>
    </div>
  </modal>
</template>

<script>
import Radio from '../../../../../../components/Radio/Radio'
import Checkbox from '../../../../../../components/Checkbox/Checkbox'
import Modal from '../../../../../../components/Modal/Modal'
import Upload from '../../../../../../components/Upload/Upload'
import MaskOk from '../../../../../../components/MaskOk/MaskOk'
import MaskRemove from '../../../../../../components/MaskRemove/MaskRemove'
import ColorPicker from '../../../../../../components/ColorPicker/ColorPicker'
import { VCARD_COVER_IMAGE_TYPE, VCARD_COVER_PURE_TYPE } from '../../constants/constants'

function initComponentStatus (vm) {
  vm.selectingCover = ''
  vm.selectedCoverType = vm.states.CONSTANTS.DEFAULT_COVER_TYPES[0].value
  vm.selectedBgColor = ''
  vm.checkedCustomColor = false
  vm.uploadCover = ''
}

export default {
  data () {
    const IMAGE_TYPE = VCARD_COVER_IMAGE_TYPE
    const PURE_TYPE = VCARD_COVER_PURE_TYPE

    this.states = {
      CONSTANTS: {
        DEFAULT_IMAGE_COVERS: [
          [
            'http://oiq00n80p.bkt.clouddn.com/vcard_cover_bg23.jpg',
            'http://oiq00n80p.bkt.clouddn.com/vcard_cover_bg7.jpg',
            'http://oiq00n80p.bkt.clouddn.com/vcard_cover_bg11.jpg',
            'http://oiq00n80p.bkt.clouddn.com/vcard_cover_bg16.jpg',
            'http://oiq00n80p.bkt.clouddn.com/vcard_cover_bg4.jpg'
          ],
          [
            'http://oiq00n80p.bkt.clouddn.com/vcard_cover_bg29.jpg',
            'http://oiq00n80p.bkt.clouddn.com/vcard_cover_bg31.jpg',
            'http://oiq00n80p.bkt.clouddn.com/vcard_cover_bg9.jpg',
            'http://oiq00n80p.bkt.clouddn.com/vcard_cover_bg28.jpg',
            'http://oiq00n80p.bkt.clouddn.com/vcard_cover_bg26.jpg'
          ]
        ],
        DEFAULT_PURE_COVERS: [
          [
            '#777777',
            '#fbcc91',
            '#1c36a7',
            '#7fac75',
            '#d4a4c5',
            '#80c3e9'
          ],
          [
            '#91d881',
            '#fdab85',
            '#f5a3c9',
            '#347bc7',
            '#f68f8e',
            '#352acd'
          ]
        ],
        DEFAULT_COVER_TYPES: [
          { value: IMAGE_TYPE, text: '图片背景' },
          { value: PURE_TYPE, text: '纯色背景' }
        ],
        IMAGE_TYPE,
        PURE_TYPE
      }
    }
    const selectedCover = this.selectedCover || {}

    return {
      // 当前选中的cover， 需要返回到父组件中的变量
      selectingCover: selectedCover.value || '',
      selectedCoverType: selectedCover.type || this.states.CONSTANTS.DEFAULT_COVER_TYPES[0].value,
      selectedPickerPureColor: '',
      checkedCustomColor: false,
      uploadCover: ''
    }
  },
  props: {
    isShow: Boolean,
    selectedCover: {},
    onOk: {
      type: Function,
      default () {}
    },
    onClose: Function
  },
  methods: {
    onSureCover () {
      this.onOk(this.selectingCover, this.selectedCoverType)
    },
    onSelectCover (cover) {
      this.checkedCustomColor = false
      this.selectingCover = cover
    },
    onUploadedImageCover (url) {
      this.uploadCover = url
    },
    onChangeVCardCoverPaneType (value) {
      this.selectedCoverType = value
    },
    onChoosePickerPureColor (color) {
      this.selectedPickerPureColor = color
      this.selectingCover = color
      this.checkedCustomColor = true
    },
    onRemoveUploadCover () {
      this.selectingCover = ''
      this.uploadCover = ''
    }
  },
  watch: {
    checkedCustomColor (val) {
      // 选中自定义颜色时，设置selectingCover
      if (val) {
        this.selectingCover = this.selectedPickerPureColor
      }
    },
    isShow (val) {
      if (val) {
        initComponentStatus(this)
      }
    },
    selectedCover (val) {
      if (val) {
        this.selectingCover = val.value

        if (val.type) {
          this.selectedCoverType = val.type
        }
      }
    }
  },
  components: {
    Radio,
    Modal,
    Upload,
    MaskOk,
    MaskRemove,
    ColorPicker,
    Checkbox
  }
}
</script>

<style scoped lang="less">
@import './UploadVCardCoverModal';
</style>
