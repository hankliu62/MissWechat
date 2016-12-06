<template>
  <div class="home-container">
    <search-bar></search-bar>
    <div class="recommend-container">
      <slider
        :items="sliders"
        :isLoop="true"
        :speed="500"
        :delay="3000"
        :isShowDots="true"
      ></slider>
    </div>
    <input v-model="main" id="main-text" type="text" />
    <footer-nav-bar :navs="navs"></footer-nav-bar>
  </div>
</template>

<script>
import SearchBar from './components/SearchBar/SearchBar'
import FooterNavBar from '../../components/FooterNavBar/FooterNavBar'
import Slider from '../../components/Slider/Slider'
import navs from '../../constants/footer-navs'
import sliderImage1 from './images/slide1.webp'
import sliderImage2 from './images/slide2.webp'
import sliderImage3 from './images/slide3.webp'

export default {
  data () {
    return {
      navs,
      main: 'main.html',
      // sliders: [
      //   {
      //     title: '',
      //     style: {
      //       src: `url(${sliderImage1})`
      //     }
      //   },
      //   {
      //     title: '',
      //     style: {
      //       'background-image': `url(${sliderImage2})`
      //     }
      //   },
      //   {
      //     title: '',
      //     style: {
      //       'background-image': `url(${sliderImage2})`
      //     }
      //   }
      // ],
      sliders: [
        { src: sliderImage1 },
        { src: sliderImage2 },
        { src: sliderImage3 }
      ]
      // sliderOptions: {
      //   currentPage: 0, // 当前页码
      //   thresholdDistance: 500, // 滑动判定距离
      //   thresholdTime: 100, // 滑动判定时间
      //   autoplay: 1000, // 自动滚动[ms]
      //   loop: true, // 循环滚动
      //   direction: 'horizontal' // 方向设置，垂直滚动
      // }
    }
  },
  methods: {
    onEnter: function (e) {
      console.log(this, e, 'vvvvvvvvvvvvvvvv')
    }
  },
  created () {
    console.log(123)
  },
  components: { SearchBar, FooterNavBar, Slider }
}
</script>
