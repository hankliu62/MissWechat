<template>
  <div
    role="tabpanel"
    :class="['tabpanel', className, { selected: selected, hidden: !selected }]"
    :id="id"
    :aria-labelledby="tabId"
    :tab-panel-index="index"
  ><slot></slot></div>
</template>

<script>
export default {
  props: {
    className: String,
    selected: Boolean,
    id: String,
    tabId: String,
    index: null
  }
}
</script>
