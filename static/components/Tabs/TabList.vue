<template>
  <ul
    role="tablist"
    :class="['tablist', className]"
  ><slot name="tab"></slot></ul>
</template>

<script>
export default {
  props: {
    className: String
  }
}
</script>
