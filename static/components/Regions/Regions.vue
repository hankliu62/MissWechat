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
        :items="provinceItems"
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
        :items="cityItems"
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
        :items="countyItems"
        v-model="selectCounty"
        @change="onSelectCounty">
      </selector>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Selector from '../Selector/Selector'
import ArrayUtil from '../../utils/ArrayUtil'

function restoreRegions (vm, provinces = []) {
  vm.selectProvince = ''
  vm.selectCity = ''
  vm.selectCounty = ''
  vm.provinceItems = provinces
  vm.cityItems = []
  vm.countyItems = []
}

function reloadRegions (vm, address) {
  if (address) {
    if ('province' in address) {
      vm.selectProvince = address.province
      const [province] = ArrayUtil.find(vm.regions[vm.type], vm.selectProvince, 'name')

      if (province) {
        vm.cityItems = [...(province.c || [])]
        if ('city' in address) {
          vm.selectCity = address.city
          vm.countyItems = []
          vm.selectCounty = ''
          const [city] = ArrayUtil.find(vm.cityItems, vm.selectCity, 'name')

          if (city) {
            vm.countyItems = city.c || []
            if ('county' in address) {
              vm.selectCounty = address.county
            }
          }
        }
      }
    }
  } else {
    restoreRegions(vm, vm.regions[vm.type])
  }
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
    },
    value: {}
  },
  computed: {
    ...mapState({
      regions: (state) => state.commonMain.regions
    })
  },
  async mounted () {
    if (this.type === 'local') {
      if (!this.regions.local || !this.regions.local.length) {
        await this.fetchRegions()
      } else {
        this.provinceItems = this.regions.local
      }

      this.provincePlaceholder = '省份/直辖市'
      this.cityPlaceholder = '市'
      this.countyPlaceholder = '县'
    }

    if (this.type === 'international') {
      if (!this.regions.international || !this.regions.international.length) {
        await this.fetchInternationalRegions()
      } else {
        this.provinceItems = this.regions.international
      }

      this.provincePlaceholder = '国家'
      this.cityPlaceholder = '省份/直辖市'
      this.countyPlaceholder = '市'
    }

    reloadRegions(this, this.value)
  },
  methods: {
    ...mapActions([
      'fetchRegions',
      'fetchInternationalRegions'
    ]),
    onSelectProvince (value) {
      this.selectProvince = value.name
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
      this.selectCity = value.name

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
      this.selectCounty = value.name
      this.$emit('change', [this.selectProvince, this.selectCity, this.selectCounty], 't')
    }
  },
  watch: {
    regions (val) {
      restoreRegions(this, val[this.type])
    },
    value (address) {
      reloadRegions(this, address)
    }
  },
  destroyed () {
    restoreRegions(this, [])
  },
  components: {
    Selector
  }
}
</script>

<style scoped lang="less">
@import "./Regions";
</style>
