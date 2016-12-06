<template>
  <div class="slider-container" @mouseover="clearLoop" @mouseout="loop">
    <ul class="sliders-wrapper" :style="slidersStyle">
      <slider-item v-for="item in items" :count="count" :item="item"></slider-item>
    </ul>
    <slider-dots v-if="isShowDots" :count="count" :current-no="currentNo" @turn="turn"></slider-dots>
    <slider-arrows v-if="isShowArrows" @turn="turn"></slider-arrows>
  </div>
</template>

<script>
import SliderItem from './SliderItem'
import SliderDots from './SliderDots'
import SliderArrows from './SliderArrows'

export default {
  data () {
    return {
      currentNo: this.no || 0,
      count: this.items.length,
      loopInterval: null
    }
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    no: {
      type: Number, // 当前页码
      default: 0
    },
    isLoop: Boolean, // 是否循环滚动
    speed: {
      type: Number, // 轮片切换的时候的速度时间[ms]
      default: 0
    },
    thresholdDistance: Number, // 滑动判定距离
    thresholdTime: Number, // 滑动判定时间[ms]
    direction: {
      type: String, // 方向设置，默认为水平滚动('horizontal'), ['horizontal', 'vertical']
      default: 'horizontal'
    },
    delay: {
      type: Number, // 自动滚动间隔时间[ms]
      default: 100
    },
    isShowDots: Boolean, // 是否显示轮播下面的小点
    isShowArrows: Boolean // 是否显示轮播的前后箭头
  },
  methods: {
    turn: function (count) {
      let nextNo = this.currentNo + count

      if (nextNo < 0) {
        nextNo += this.count
      }

      if (nextNo >= this.count) {
        nextNo -= this.count
      }

      this.currentNo = nextNo
      this.$emit('slide', nextNo) // 当前滑动到第(number)页的回调事件
    },
    loop: function () {
      if (this.isLoop) {
        if (this.loopInterval) {
          this.clearLoop()
        }

        this.loopInterval = window.setTimeout(function () {
          this.turn(1)
          this.loop()
        }.bind(this), this.delay)
      }
    },
    clearLoop: function () {
      if (this.loopInterval) {
        window.clearTimeout(this.loopInterval);
        this.loopInterval = null;
      }
    }
  },
  computed: {
    slidersStyle: function () {
      return {
        width: `${this.count * 100}%`,
        left: `${-100 * this.currentNo}%`,
        transitionDuration: `${this.speed / 1000}s`
      }
    }
  },
  created () {
    this.loop()
  },
  components: { SliderItem, SliderDots, SliderArrows }
}
</script>

<style lang="less">
@import './Slider';
</style>
