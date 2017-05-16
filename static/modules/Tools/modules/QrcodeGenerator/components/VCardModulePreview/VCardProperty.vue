<template>
  <div :class="`vcard-property ${extraClass}`">
    <div class="vcard-property-label" v-text="propertyKey"></div>
    <div class="vcard-property-value" v-text="propertyValue"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    propertyKey: String,
    propertyValue: String,
    extraClass: String
  }
}
</script>
