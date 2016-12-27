import { HEX_CONVERTER_MAIN_NAVS } from '../constants/navs'
import { SUCCESS_RESULT } from '../../../constants/constants'

export default {
  isShowExamples: false,
  selectedIndex: -1,
  optionsTabs: {
    tab: 'input-tab',
    panel: 'input-tab-panel'
  },
  nav: {
    items: HEX_CONVERTER_MAIN_NAVS,
    title: 'Hex Converter'
  },
  result: {
    ...SUCCESS_RESULT,
    rows: []
  },
  example: {
    rows: []
  }
}
