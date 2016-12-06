<template>
  <div class="slider-arrows-container">
    <span class="slider-arrow slider-arrow-left" @click="onClickArrow(-1)">
      <span class="icon icon-angle-left"></span>
    </span>
    <span class="slider-arrow slider-arrow-right" @click="onClickArrow(1)">
      <span class="icon icon-angle-right"></span>
    </span>
  </div>
</template>

<script>
export default {
  methods: {
    onClickArrow: function (count) {
      this.$emit('turn', count)
    }
  }
}
</script>
