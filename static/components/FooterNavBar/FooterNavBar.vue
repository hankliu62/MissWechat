<template>
  <footer class="footer-nav">
    <ul class="nav-bar">
      <li v-for="nav in navs" :class="{ 'nav-item': true, [nav.classname]: true, 'active': isActivedNav(nav.link) }">
        <a :alt="nav.name" target="_self" :href="nav.link">
          <div class="nav-item-icon"></div>
          <p class="nav-item-content">{{ nav.name }}</p>
        </a>
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  props: {
    navs: {
      type: Array,
      required: true
    }
  },
  methods: {
    isActivedNav: function (link) {
      return new RegExp(`^\\${this.$route.path}`).test(link)
    }
  }
}
</script>

<style lang="less">
@import './FooterNavBar';
</style>
