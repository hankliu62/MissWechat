<template>
  <ul class="slider-dots-container">
    <li
      class="slider-dot"
      v-for="no in count"
      :class="{ 'slider-dot-selected': no - 1 === currentNo }"
      @click="onClickDot(no)"
    ></li>
  </ul>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      reqiured: true
    },
    currentNo: {
      type: Number,
      reqiured: true,
      default: 0
    }
  },
  methods: {
    onClickDot: function (no) {
      this.$emit('turn', no - 1 - this.currentNo)
    }
  }
}
</script>
