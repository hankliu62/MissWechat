import { TOOLS_QRCODE_GENERATE_SUCCESS } from '../constants/types'

export default {
  [TOOLS_QRCODE_GENERATE_SUCCESS] (state, qrcodeUrl) {
    state.qrcodeUrl = qrcodeUrl
  }
}
