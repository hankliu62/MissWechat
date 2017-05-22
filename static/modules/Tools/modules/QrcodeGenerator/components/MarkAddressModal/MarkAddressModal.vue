<template>
  <modal
    title="标注地图位置"
    :is-show="isShow"
    :default-footer="true"
    custom-class="mark-address-modal"
    :onOk="onOkMark"
    :onClose="onClose">
    <div slot="body" class="mark-address-modal-header">
      <h3 class="mark-address-body-header">
        <input-btn-group
          :model="searchKey"
          btn-text="搜索定位"
          @onChangeModel="onChange"
          @onClickBtn="onSearch" />
        <info-tip type="info" content="拖动地图中的红色标注点到对应位" :hidden-tip="true" />
      </h3>
      <i-map ref="map" @mounted="initMap"></i-map>
    </div>
  </modal>
</template>

<script>
import Modal from '../../../../../../components/Modal/Modal'
import IMap from '../../../../../../components/IMap/IMap'
import InfoTip from '../../../../../../components/InfoTip/InfoTip'
import InputBtnGroup from '../../../../../../components/InputBtnGroup/InputBtnGroup'

export default {
  data () {
    return {
      searchKey: ''
    }
  },
  props: {
    isShow: Boolean,
    onOk: Function,
    onClose: Function,
    address: String
  },
  methods: {
    onOkMark () {
      if (this.onOk) {
        this.onOk(this.map.getCenter())
      }
    },
    onChange (value) {
      this.searchKey = value
    },
    onSearch () {
      if (this.ready && this.searchKey) {
        if (this.$refs.map && this.$refs.map.onGeocoder) {
          this.$refs.map.onGeocoder.bind(this.$refs.map)
          this.$refs.map.onGeocoder(this.searchKey)
        }
      }
    },
    initMap (mapOptions) {
      if (mapOptions.map) {
        this.ready = true
        this.map = mapOptions.map
      }
    },
    destroyedMap () {
      this.map = null
    }
  },
  components: {
    InputBtnGroup,
    InfoTip,
    Modal,
    IMap
  }
}
</script>

<style scoped lang="less">
@import './MarkAddressModal';
</style>
