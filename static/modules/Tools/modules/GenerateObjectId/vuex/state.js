import { GENERATE_OBJECTID_MAIN_NAVS } from '../constants/navs'
import { SUCCESS_RESULT, DEFALUT_CODE_TABS, METADATAS } from '../constants/constants'

export default {
  optionsTabs: {
    tab: 'options',
    panel: 'options-panel'
  },
  codeTabs: {...DEFALUT_CODE_TABS},
  demo: new Array(24).fill('0').join(),
  navs: GENERATE_OBJECTID_MAIN_NAVS,
  result: {
    ...SUCCESS_RESULT,
    rows: []
  },
  example: {
    rows: []
  },
  metadatas: METADATAS,
  isShowMetadata: false,
  isShowExamples: false,
  selectedIndex: -1
}
