import { TOOLS_QRCODE_GENERATOR_MAIN_SET, TOOLS_QRCODE_GENERATE_SUCCESS } from '../constants/types'

export default {
  [TOOLS_QRCODE_GENERATE_SUCCESS] (state, qrcodeUrl) {
    state.qrcodeUrl = qrcodeUrl
  },
  [TOOLS_QRCODE_GENERATOR_MAIN_SET] (state, { payload }) {
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        state[key] = payload[key]
      }
    }
  }
}
