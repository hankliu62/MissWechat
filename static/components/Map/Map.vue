<template>
  <div class="hk-map">
    <div id="mapContainer" ref="map" class="map-container"></div>
  </div>
</template>

<script>

function getMapInstance (vm) {
  if (!vm.map) {
    point = new BMap.Point(116.404, 39.915)
    zoom = 14

    map = new BMap.Map('mapContainer')
    map.centerAndZoom(point, zoom)
    map.enableScrollWheelZoom()
    map.enableDragging()

    scaleControl = new BMap.ScaleControl {
      anchor: BMAP_ANCHOR_TOP_LEFT
    }
    navigationControl = new BMap.NavigationControl()

    map.addControl scaleControl
    map.addControl navigationControl

    vm.map = map
  }

  return vm.map
}

export default {
  data () {
    return {}
  },
  mounted () {
    getMapInstance(this)
  }
}
</script>

<style scoped lang="less">
@import './Map';
</style>
