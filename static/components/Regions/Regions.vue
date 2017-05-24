<template>
  <div class="hk-regions">
    <div class="regions-item regions-province">
      <selector
        class="hk-select"
        popper-class="hk-select-dropdown"
        label-field="name"
        value-field="name"
        :disabled="provinceItems.length === 0"
        :placeholder="provincePlaceholder"
        v-model="selectProvince"
        @change="onSelectProvince">
      </selector>

    </div>
    <div class="regions-item regions-city">
      <selector
        class="hk-select"
        popper-class="hk-select-dropdown"
        label-field="name"
        value-field="name"
        :disabled="cityItems.length === 0"
        :placeholder="cityPlaceholder"
        v-model="selectCity"
        @change="onSelectCity">
      </selector>
    </div>
    <div class="regions-item regions-county">
      <selector
        class="hk-select"
        popper-class="hk-select-dropdown"
        label-field="name"
        value-field="name"
        :disabled="countyItems.length === 0"
        :placeholder="countyPlaceholder"
        v-model="selectCounty"
        @change="onSelectCounty">
      </selector>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Selector from '../Selector/Selector'

function restoreRegions (vm, provinces = []) {
  vm.selectProvince = ''
  vm.selectCity = ''
  vm.selectCounty = ''
  vm.provinceItems = provinces
  vm.cityItems = []
  vm.countyItems = []
}

export default {
  data () {
    return {
      selectProvince: '',
      selectCity: '',
      selectCounty: '',
      provincePlaceholder: '',
      cityPlaceholder: '',
      countyPlaceholder: '',
      provinceItems: [],
      cityItems: [],
      countyItems: []
    }
  },
  props: {
    type: {
      type: String,
      default: 'local'
    }
  },
  computed: {
    ...mapState({
      regions: (state) => state.commonMain.regions
    })
  },
  mounted () {
    if (this.type === 'local') {
      if (!this.regions.local || !this.regions.local.length) {
        this.fetchRegions()
      } else {
        this.provinceItems = this.regions.local
      }

      this.provincePlaceholder = '省份/直辖市'
      this.cityPlaceholder = '市'
      this.countyPlaceholder = '县'
    }

    if (this.type === 'international') {
      if (!this.regions.international || !this.regions.international.length) {
        this.fetchInternationalRegions()
      } else {
        this.provinceItems = this.regions.international
      }

      this.provincePlaceholder = '国家'
      this.cityPlaceholder = '省份/直辖市'
      this.countyPlaceholder = '市'
    }
  },
  methods: {
    ...mapActions([
      'fetchRegions',
      'fetchInternationalRegions'
    ]),
    onSelectProvince (value) {
      this.selectProvince = value
      for (const province of this.provinceItems) {
        if (province.name === this.selectProvince) {
          this.cityItems = province.c
          break
        }
      }

      this.countyItems = []
      this.selectCity = ''
      this.selectCounty = ''

      this.$emit('change', [this.selectProvince, this.selectCity, this.selectCounty], 'f')
    },
    onSelectCity (value) {
      this.selectCity = value

      for (const city of this.cityItems) {
        if (city.name === this.selectCity) {
          this.countyItems = city.c
          break
        }
      }

      this.selectCounty = ''

      this.$emit('change', [this.selectProvince, this.selectCity, this.selectCounty], 's')
    },
    onSelectCounty (value) {
      this.selectCounty = value
      this.$emit('change', [this.selectProvince, this.selectCity, this.selectCounty], 't')
    }
  },
  watch: {
    regions (val) {
      restoreRegions(this, val[this.type])
    }
  },
  components: {
    Selector
  }
}
</script>

<style scoped lang="less">
@import "./Regions";
</style>
