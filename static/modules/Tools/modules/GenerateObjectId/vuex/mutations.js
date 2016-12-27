import {
  TOOLS_GENERATE_OBJECTIDS_SUCCESS,
  TOOLS_GENERATE_OBJECTIDS_FAIL,
  TOOLS_GENERATE_MAIN_SET
} from '../constants/types'
import { SUCCESS_RESULT, ERROR_RESULT, DEFALUT_CODE_TABS } from '../constants/constants'

export default {
  [TOOLS_GENERATE_MAIN_SET] (state, { payload }) {
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        state[key] = payload[key]
      }
    }
  },
  [TOOLS_GENERATE_OBJECTIDS_SUCCESS] (state, { objectIds }) {
    state.result = {
      ...SUCCESS_RESULT,
      rows: objectIds
    }
    state.isShowMetadata = false
    state.isShowExamples = false
    state.selectedIndex = -1
    state.codeTabs = {...DEFALUT_CODE_TABS}
  },
  [TOOLS_GENERATE_OBJECTIDS_FAIL] (state, { error }) {
    state.result = {
      ...ERROR_RESULT,
      rows: [error]
    }
    state.example = {
      rows: [state.demo]
    }
    state.isShowMetadata = true
    state.isShowExamples = true
    state.selectedIndex = -1
    state.codeTabs = {...DEFALUT_CODE_TABS}
  }
}
