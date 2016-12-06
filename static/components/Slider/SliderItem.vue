<template>
  <li class="slider-item-container" :style="itemStyle">
    <img :src="item.src" :alt="item.alt" />
  </li>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    itemStyle: function () {
      return { width: `${100 / this.count}%` }
    }
  }
}
</script>
