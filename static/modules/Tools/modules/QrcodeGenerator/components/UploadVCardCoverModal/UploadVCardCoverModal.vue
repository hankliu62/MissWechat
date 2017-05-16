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
        <div class="default-covers-header"></div>
        <div class="default-covers-list">
          <ul class="default-covers-group" v-for="covers in states.CONSTANTS.DEFAULT_COVERS">
            <li
              class="default-covers-item"
              v-for="cover in covers"
              @click="onSelectCover(cover)">
              <img class="cover-image" :src="`${cover}?imageView2/2/w/120`" />
              <mask-ok v-if="selectingCover === cover" />
            </li>
          </ul>
        </div>
      </div>
      <div class="upload-covers">
        <div class="upload-covers-header">自定义背景</div>
        <upload titles="Image files" extensions="jpeg,jpg,png,gif" @onUploadedFile="onUploadedCover">
          <button class="btn hk-btn btn-default btn-upload">本地上传</button>
        </upload>
        <div class="upload-covers-item" v-if="uploadCover" @click="onSelectCover(uploadCover)">
          <img class="cover-image" :src="`${uploadCover}?imageView2/2/w/120`" />
          <mask-ok v-if="selectingCover === uploadCover" />
          <mask-remove />
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from '../../../../../../components/Modal/Modal'
import Upload from '../../../../../../components/Upload/Upload'
import MaskOk from '../../../../../../components/MaskOk/MaskOk'
import MaskRemove from '../../../../../../components/MaskRemove/MaskRemove'
import QiniuUtil from '../../../../../../utils/QiniuUtil'
import QrcodeUtil from '../../../../../../utils/QrcodeUtil'

export default {
  data () {
    this.states = {
      CONSTANTS: {
        DEFAULT_COVERS: [
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
        ]
      }
    }

    return {
      selectingCover: '',
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
      this.selectingCover = url
    },
    onUploadedCover (url) {
      this.uploadCover = url
    }
  },
  components: {
    Modal,
    Upload,
    MaskOk,
    MaskRemove
  }
}
</script>

<style scoped lang="less">
@import './UploadVCardCoverModal';
</style>
