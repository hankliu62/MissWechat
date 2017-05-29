<template>
  <div class="home-container">
    <div class="home-body">
      <header class="home-header">
        <search-bar></search-bar>
      </header>
      <div class="recommend-container">
        <slider
          :items="sliders"
          :isLoop="true"
          :speed="500"
          :delay="3000"
          :isShowDots="true"
        ></slider>
      </div>
      <ul class="products-wrapper">
        <li class="product" v-for="product in products">
          <div class="picture">
            <img class="img" :src="product.pictures[0]">
          </div>
          <div class="content">
            <div class="name" v-text="product.name"></div>
            <div class="brief" v-text="product.brief"></div>
            <div class="price">
              <span v-text="product.price + '元'"></span>
              <span v-if="product.isMultiPrice">起</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <footer class="home-footer">
      <footer-nav-bar :navs="navs"></footer-nav-bar>
    </footer>
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
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      navs,
      sliders: [
        { src: sliderImage1 },
        { src: sliderImage2 },
        { src: sliderImage3 }
      ]
    }
  },
  methods: {
    ...mapActions(['fetchProducts'])
  },
  created: function () {
    this.fetchProducts()
  },
  computed: {
    ...mapState({
      products: state => state.homeMain.products
    })
  },
  components: { SearchBar, FooterNavBar, Slider }
}
</script>

<style scoped lang='less'>
@import './HomeMain';
</style>
