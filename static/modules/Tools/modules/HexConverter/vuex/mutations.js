import {
  TOOLS_HEX_CONVERT_SUCCESS,
  TOOLS_HEX_CONVERT_FAIL,
  TOOLS_HEX_CONVERTER_MAIN_SET,
  TOOLS_HEX_GET_LOADFILE_CONTENT
} from '../constants/types'
import { SUCCESS_RESULT } from '../../../constants/constants'

export default {
  [TOOLS_HEX_CONVERTER_MAIN_SET] (state, { payload }) {
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        state[key] = payload[key]
      }
    }
  },
  [TOOLS_HEX_CONVERT_SUCCESS] (state, { result }) {
    state.result = {
      ...SUCCESS_RESULT,
      rows: [result]
    }
    state.isShowExamples = false
    state.selectedIndex = -1
  },
  [TOOLS_HEX_CONVERT_FAIL] (state, { statusCode, name, message }) {
    state.result = {
      statusCode,
      statusMessage: name,
      rows: [message]
    }
    state.isShowExamples = true
    state.selectedIndex = -1
  },
  [TOOLS_HEX_GET_LOADFILE_CONTENT] (state, { code }) {
    state.code = code
  }
}
