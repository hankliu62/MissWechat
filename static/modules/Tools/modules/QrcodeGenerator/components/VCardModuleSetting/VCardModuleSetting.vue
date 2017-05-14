<template>
  <div class="vcard-setting-container">
    <module-item-setting
      :module="states.CONSTANTS.MODULE.Basic"
      v-if="states.CONSTANTS.MODULE.Basic === selectedModule">
      <div class="form-group vcard-setting-item">
        <label class="form-control-label">头像</label>
        <div class="form-control-content">
          <upload titles="Image files" extensions="jpeg,jpg,png,gif" @onUploadedFile="onUploadedAvatar">
            <div class="btn hk-btn btn-default">上传头像</div>
          </upload>
        </div>
      </div>
      <div class="form-group vcard-setting-item">
        <label class="form-control-label">封面图</label>
        <div class="form-control-content">
          <button class="btn hk-btn btn-default" @click="onOpenCoverModal">选择封面图</button>
          <info-tip content="图片建议尺寸720*330px，居中展示建议尺寸720*450px" :hidden-tip="true" />
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
            v-for="item in states.headerPreviewLayout"
            :class="{ 'layout-item': true, [`layout-${item}`]: true, activated: selectedPreviewLayout === item}">
            <div class="selected-mask">
              <div class="selected-icon"></div>
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

export default {
  data () {
    this.states = {
      CONSTANTS: {
        MODULE: VCARD_MODULE
      },
      headerPreviewLayout: ['left', 'middle', 'right']
    }

    return {
      isOpenCoverModal: false,
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
      console.log(url, key)
    },
    onOpenCoverModal () {
      this.isOpenCoverModal = true
      console.log(this.isOpenCoverModal)
    }
  },
  components: {
    ModuleItemSetting,
    Upload,
    InfoTip,
    CountInput
  }
}
</script>

<style lang="less">
@import './VCardModuleSetting';
</style>

