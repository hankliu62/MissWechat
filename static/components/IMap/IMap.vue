<template>
  <div class="hk-map">
    <div id="mapContainer" ref="map" class="map-container"></div>
  </div>
</template>

<script>
function getMapInstance (vm) {
  if (!vm.map) {
    const map = new BMap.Map('mapContainer')
    const point = new BMap.Point(116.404, 39.915)

    map.centerAndZoom(point, 14)
    map.enableScrollWheelZoom()
    map.enableDragging()

    // const scaleControl = new BMap.ScaleControl({
    //   anchor: window.BMAP_ANCHOR_TOP_LEFT
    // })
    const navigationControl = new BMap.NavigationControl()

    // TODO： 研究加了以后，为什么设置地图center地图viewpoint不会定位到point所在的位置
    // map.addControl(scaleControl)
    map.addControl(navigationControl)

    vm.map = map
  }

  return vm.map
}

function getMarkerInstance (vm) {
  const map = getMapInstance(vm)
  if (!vm.marker) {
    const point = map.getCenter()
    const marker = new BMap.Marker(point) // 创建标注
    marker.enableDragging() // 开启标注拖拽功能
    map.addOverlay(marker)
    marker.dragendHandler = marker.addEventListener('dragend', vm.onDragendMarker)
    return marker
  }

  return vm.marker
}

function getGeocoderInstance () {
  const geocoder = new BMap.Geocoder()
  return geocoder
}

export default {
  data () {
    return {}
  },
  methods: {
    onDragendMarker (type, target, pixel, point) {
      this.$emit('onDragendMarker', type, target, pixel, point)
    },
    onGeocoder (address, city) {
      const that = this
      return new Promise(function (resolve, reject) {
        const geocoder = getGeocoderInstance()
        const map = getMapInstance(that)
        const marker = getMarkerInstance(that)

        geocoder.getPoint(address, function (point) {
          if (point) {
            map.reset()
            map.centerAndZoom(point, 14)
            marker.setPosition(point)
            resolve(point)
          } else {
            console.warn('您选择地址没有解析到结果!')
            reject('您选择地址没有解析到结果!')
          }
        }, city)
      })
    }
  },
  async mounted () {
    const map = getMapInstance(this)
    const marker = getMarkerInstance(this)
    this.map = map
    this.marker = marker
    marker.setPosition(map.getCenter())

    this.$emit('mounted', { map, customService: { geocoder: this.onGeocoder.bind(this) } })
  },
  destroyed () {
    if (this.map) {
      this.map.clearOverlays()
      this.map = null
    }

    this.$emit('destroyed')
  }
}
</script>

<style scoped lang="less">
@import './IMap';
</style>
