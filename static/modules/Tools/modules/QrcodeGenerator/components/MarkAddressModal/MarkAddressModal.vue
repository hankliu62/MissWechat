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
        <regions type="local" @change="onChangeRegions" />
        <input-btn-group
          :model="town"
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
  return `${vm.province}${vm.city}${vm.county}${vm.town}`
}

export default {
  data () {
    return {
      province: '',
      city: '',
      county: '',
      town: '',
      map: null
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
    this.province = this.address.province
    this.city = this.address.city
    this.county = this.address.county
    this.town = this.address.town
  },
  methods: {
    onOkMark () {
      if (this.onOk) {
        this.onOk(this.map.getCenter())
      }
    },
    onChange (value) {
      this.town = value
    },
    onSearch () {
      if (this.map) {
        if (this.province && this.city && this.county && this.town) {
          this.map.customService.geocoder(getAddress(this), this.city)
        } else {
          Notification.service({content: '请选择区域和输入地址信息', type: 'error'})
        }
      }
    },
    onChangeRegions ([province, city, county]) {
      this.province = province
      this.city = city
      this.county = county
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
        this.province = this.address.province
        this.city = this.address.city
        this.county = this.address.county
        this.town = this.address.town
      }
    }
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
