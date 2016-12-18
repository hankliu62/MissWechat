<template>
  <form class="options-form" role="form" @submit.stop.prevent="onSubmit">
    <div class="param-item" v-if="paramInputOption && paramInputOption.param">
      <div class="param-item-name">
        <label for="params" v-text="paramInputOption.param.name"></label>
        <div class="param-type" v-text="paramInputOption.param.type"></div>
      </div>
      <div class="param-item-info">
        <div class="param-item-desc">
          <div class="param-item-required">required</div>
          <p class="desc-info" v-text="paramInputOption.param.desc"></p>
        </div>
        <div class="param-item-input">
          <input id="params" type="text" v-model="param" required="required" class="form-control full">
        </div>
      </div>
    </div>
    <div class="param-item">
      <div class="param-item-name">
        <label for="number">Number</label>
        <div class="param-type">int</div>
      </div>
      <div class="param-item-info">
        <div class="param-item-desc">
          <div class="param-item-required">required</div>
          <p class="desc-info">How many ObjectIDs will Generate</p>
        </div>
        <div class="param-item-input">
          <input id="number" v-model="number" type="text" required="required" class="form-control full">
        </div>
      </div>
    </div>
    <div class="btns-group">
      <button type="submit" class="btn btn-primary">Try it</button>
      <button type="button" class="btn btn-default" @click="onReset">Reset</button>
    </div>
  </form>
</template>

<script>
import { GENERATE_OBJECTID_TYPES } from '../../constants/constants'
export default {
  data () {
    return {
      param: '',
      number: ''
    }
  },
  props: {
    type: {
      type: String,
      default: 'empty'
    }
  },
  computed: {
    paramInputOption () {
      return GENERATE_OBJECTID_TYPES.find(item => item.type === this.type)
    }
  },
  methods: {
    onSubmit () {
      this.$emit('submit', { param: this.param, number: this.number })
    },
    onReset () {
      this.param = ''
      this.number = ''
    }
  }
}
</script>

<style lang="less">
@import './OptionsForm';
</style>
