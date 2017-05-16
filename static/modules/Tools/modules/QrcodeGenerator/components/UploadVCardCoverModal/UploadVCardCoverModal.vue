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
            :model="selectedDefaultCoverType"
            @onChange="onChangeVCardCoverPaneType">
            <span v-text="option.text"></span>
          </radio>
        </div>
        <div class="default-covers-list">
          <ul
            class="default-covers-group"
            v-for="covers in states.CONSTANTS.DEFAULT_IMAGE_COVERS"
            v-if="selectedDefaultCoverType === states.CONSTANTS.IMAGE_TYPE">
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
            v-if="selectedDefaultCoverType === states.CONSTANTS.PURE_TYPE">
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
      <template v-if="selectedDefaultCoverType === states.CONSTANTS.IMAGE_TYPE">
        <div class="upload-covers">
          <div class="upload-covers-header">
            <label class="covers-header-label">自定义背景</label>
          </div>
          <upload titles="Image files" extensions="jpeg,jpg,png,gif" @onUploadedFile="onUploadedCover">
            <button class="btn hk-btn btn-default btn-upload">本地上传</button>
          </upload>
          <div class="upload-covers-item" v-if="uploadCover" @click="onSelectCover(uploadCover)">
            <img class="cover-image" :src="`${uploadCover}?imageView2/1/w/120/h/72`" />
            <mask-ok v-if="selectingCover === uploadCover" />
            <mask-remove />
          </div>
        </div>
      </template>

      <!-- 纯色背景 -->
      <template v-if="selectedDefaultCoverType === states.CONSTANTS.PURE_TYPE">
        <div class="upload-covers upload-covers-type-pure">
          <div class="upload-covers-header">
            <checkbox v-model="checkedCustomColor">
              <label class="covers-header-label">自定义颜色</label>
            </checkbox>
          </div>
          <color-picker :value="selectedBgColor" @submit="onChooseBgColor" />
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
import QiniuUtil from '../../../../../../utils/QiniuUtil'
import QrcodeUtil from '../../../../../../utils/QrcodeUtil'

function initComponentStatus (vm) {
  vm.selectingCover = ''
  vm.selectedDefaultCoverType = vm.states.CONSTANTS.DEFAULT_COVER_TYPES[0].value
  vm.selectedBgColor = ''
  vm.checkedCustomColor = false
  vm.uploadCover = ''
}

export default {
  data () {
    const IMAGE_TYPE = 'image'
    const PURE_TYPE = 'pure'

    this.states = {
      CONSTANTS: {
        DEFAULT_IMAGE_COVERS: [
          [
            'http://oiq00n80p.bkt.clouddn.com/bg1.jpg',
            'http://oiq00n80p.bkt.clouddn.com/bg2.jpg',
            'http://oiq00n80p.bkt.clouddn.com/bg3.jpg',
            'http://oiq00n80p.bkt.clouddn.com/bg4.jpg',
            'http://oiq00n80p.bkt.clouddn.com/bg5.jpg'
          ],
          [
            'http://oiq00n80p.bkt.clouddn.com/bg6.jpg',
            'http://oiq00n80p.bkt.clouddn.com/bg7.jpg',
            'http://oiq00n80p.bkt.clouddn.com/bg8.jpg',
            'http://oiq00n80p.bkt.clouddn.com/bg9.jpg',
            'http://oiq00n80p.bkt.clouddn.com/bg10.jpg'
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

    return {
      selectingCover: '',
      selectedDefaultCoverType: this.states.CONSTANTS.DEFAULT_COVER_TYPES[0].value,
      selectedBgColor: '',
      checkedCustomColor: false,
      uploadCover: ''
    }
  },
  props: {
    isShow: Boolean,
    selectedCover: String,
    onOk: {
      type: Function,
      default () {}
    },
    onClose: Function
  },
  methods: {
    onSureCover () {
      this.onOk(this.selectingCover)
    },
    onSelectCover (url) {
      this.checkedCustomColor = false
      this.selectingCover = url
    },
    onUploadedCover (url) {
      this.uploadCover = url
    },
    onChangeVCardCoverPaneType (value) {
      this.selectedDefaultCoverType = value
    },
    onChooseBgColor (color) {
      this.selectedBgColor = color
    }
  },
  watch: {
    checkedCustomColor (val) {
      if (val) {
        this.uploadCover = this.selectedBgColor
      }
    },
    isShow (val) {
      if (val) {
        initComponentStatus(this)
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
