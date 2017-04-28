<template>
  <div class="file-qrcode-generater">
    <div class="file-upload-wrap">
      <upload
        :titles="['Doc files', 'Image files', 'Video files']"
        :extensions="['pdf,doc,docx,ppt,pptx,vcf,pot,potx,xls,xlsx,txt,rtf,wps,dps', 'jpg,jpeg,gif,png,bmp', 'mp3,wma,mid']"
        @onUploadedFile="onUploadedFile"
        :isCreateKey="false">
        <div class="file-content-wrap">
          <input class="hk-input file-name" placeholder="请选择上传的文件" v-model="file.key" disabled/>
          <div class="btn hk-btn btn-theme btn-upload-file" v-text="btnText"></div>
        </div>
      </upload>
    </div>
    <toggle-editor
      :content="content"
      :isShowEditor="isShowEditor"
      @onChangeText="onChangeText"
      @onChangeHtml="onChangeHtml"
      @onToggleIsShowEditor="onToggleIsShowEditor">
    </toggle-editor>
    <div class="upload-tips">
      <el-tooltip
        class="item"
        effect="dark"
        placement="top"
        popper-class="hk-tooltip-popper">
        <ul slot="content" class="file-qrcode file-types">
          <li class="file-type-item" v-for="(type, key) in CONSTANTS.UPLOAD_FILE_TYPES">
            <span class="file-type-name" v-text="type.title + ': '"></span>
            <span class="file-type-contents" v-text="type.mimes.join(',')"></span>
          </li>
        </ul>
        <span class="upload-types-tip"><icon-question-circle></icon-question-circle>支持文件格式</span>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import { PARAM_TYPES, UPLOAD_FILE_TYPES } from '../../constants/constants'
import ToggleEditor from '../ToggleEditor/ToggleEditor'
import Upload from '../../../../../../components/Upload/Upload'
import IconQuestionCircle from '../../../../../../components/IconQuestionCircle/IconQuestionCircle'

const CONSTANTS = {
  DEFAULT_FILE_CONTENT: {
    file: {
      key: '',
      url: ''
    },
    content: {
      text: '',
      html: ''
    }
  }
}

const getFileContent = function (vm) {
  const qrcodeContent = vm.qrcodeContent || {}
  const fileContent = qrcodeContent[PARAM_TYPES.FILE] ? qrcodeContent[PARAM_TYPES.FILE] : CONSTANTS.DEFAULT_FILE_CONTENT
  return fileContent
}

export default {
  data () {
    this.CONSTANTS = {
      UPLOAD_FILE_TYPES
    }

    return {}
  },
  props: {
    qrcodeContent: Object,
    isShowEditor: Boolean
  },
  methods: {
    onToggleIsShowEditor () {
      this.$emit('onToggleIsShowEditor')
    },
    onChangeText (text) {
      const fileContent = getFileContent(this)
      const qrcodeContent = {
        ...(this.qrcodeContent || {}),
        [PARAM_TYPES.FILE]: {
          file: fileContent.file,
          content: { text, html: fileContent.content.html }
        }
      }
      this.$emit('onChangeContent', qrcodeContent)
    },
    onChangeHtml (html) {
      const fileContent = getFileContent(this)
      const qrcodeContent = {
        ...(this.qrcodeContent || {}),
        [PARAM_TYPES.FILE]: {
          file: fileContent.file,
          content: { text: fileContent.content.text, html }
        }
      }
      this.$emit('onChangeContent', qrcodeContent)
    },
    onUploadedFile (url, key) {
      const fileContent = getFileContent(this)
      const qrcodeContent = {
        ...(this.qrcodeContent || {}),
        [PARAM_TYPES.FILE]: {
          file: { url, key },
          content: fileContent.content
        }
      }
      this.$emit('onChangeContent', qrcodeContent)
    }
  },
  computed: {
    content () {
      const fileContent = getFileContent(this)
      return { ...fileContent.content }
    },
    file () {
      const fileContent = getFileContent(this)
      return fileContent.file
    },
    btnText () {
      const fileContent = getFileContent(this)
      return fileContent.file && fileContent.file.url ? '重新上传' : '上传本地文件'
    }
  },
  components: { ToggleEditor, Upload, IconQuestionCircle }
}
</script>

<style scoped lang="less">
@import './FileQrcodeGenerate';
</style>
