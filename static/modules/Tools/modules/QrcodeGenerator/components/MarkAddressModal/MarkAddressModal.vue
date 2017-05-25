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
        <regions type="local" @change="onChangeRegions" v-model="stateAddress" />
        <input-btn-group
          v-model="stateAddress.town"
          btn-text="搜索定位"
          @onChangeModel="onChange"
          @onClickBtn="onSearch" />
        <info-tip type="info" content="拖动地图中的红色标注点到对应位" :hidden-tip="true" />
      </h3>
      <i-map ref="map" @mounted="mountedMap"></i-map>
    </div>
  </modal>
</template>

<script>
import Modal from '../../../../../../components/Modal/Modal'
import IMap from '../../../../../../components/IMap/IMap'
import Regions from '../../../../../../components/Regions/Regions'
import InfoTip from '../../../../../../components/InfoTip/InfoTip'
import InputBtnGroup from '../../../../../../components/InputBtnGroup/InputBtnGroup'
import { Notification } from '../../../../../../services'

function getAddress (vm) {
  return `${vm.stateAddress.province}${vm.stateAddress.city}${vm.stateAddress.county}${vm.stateAddress.town}`
}

function restoreStateData (vm) {
  vm.destroyedMap()
  vm.stateAddress = {province: '', city: '', county: '', town: ''}
  vm.point = null
}

export default {
  data () {
    return {
      stateAddress: {
        province: '',
        city: '',
        county: '',
        town: ''
      },
      map: null,
      point: null
    }
  },
  props: {
    isShow: Boolean,
    onOk: Function,
    onClose: Function,
    address: {
      type: Object,
      default: function () {
        return {province: '', city: '', county: '', town: ''}
      }
    }
  },
  mounted () {
    this.stateAddress = { ...this.address }
  },
  methods: {
    onOkMark () {
      if (this.point) {
        if (this.onOk) {
          const point = this.map.getCenter()
          const address = { ...this.stateAddress }
          this.onOk(point, address)
        }
        return
      }

      Notification.service({content: '请搜索定位地址', type: 'error'})
    },
    onChange (value) {
      this.stateAddress.town = value
    },
    onSearch () {
      if (this.map) {
        if (this.stateAddress.province && this.stateAddress.city && this.stateAddress.county && this.stateAddress.town) {
          const that = this
          this.map.customService.geocoder(getAddress(this), this.stateAddress.city).then(function (point) {
            that.point = point
          }, function (info) {
            Notification.service({content: info, type: 'info'})
          })
        } else {
          Notification.service({content: '请选择区域和输入地址信息', type: 'error'})
        }
      }
    },
    onChangeRegions ([province, city, county]) {
      this.stateAddress.province = province
      this.stateAddress.city = city
      this.stateAddress.county = county
      this.point = null
    },
    mountedMap (mapOptions) {
      if (mapOptions.map) {
        this.map = mapOptions.map
        this.map.customService = mapOptions.customService
      }
    },
    destroyedMap () {
      this.map = null
    }
  },
  watch: {
    isShow (val) {
      if (val) {
        this.stateAddress = { ...this.address }
      }
    }
  },
  destroyed () {
    restoreStateData(this)
  },
  components: {
    InputBtnGroup,
    InfoTip,
    Regions,
    Modal,
    IMap
  }
}
</script>

<style scoped lang="less">
@import './MarkAddressModal';
</style>

<style lang="less">
@import './MarkAddressModalModule';
</style>
