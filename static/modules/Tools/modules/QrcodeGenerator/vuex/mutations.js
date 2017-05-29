import { TOOLS_QRCODE_GENERATOR_MAIN_SET, TOOLS_QRCODE_GENERATE_SUCCESS, TOOLS_QRCODE_VCARD_CONTENT_RESET } from '../constants/types'
import { DEFAULT_CARD_QRCODE_CONTENT, PARAM_TYPES } from '../constants/constants'
import ObjectUtil from '../../../../../utils/ObjectUtil'

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
  },
  [TOOLS_QRCODE_VCARD_CONTENT_RESET] (state) {
    const qrcodeContent = ObjectUtil.cloneDeep(state.qrcodeContent)
    qrcodeContent[PARAM_TYPES.VCARD] = ObjectUtil.cloneDeep(DEFAULT_CARD_QRCODE_CONTENT)
    state.qrcodeUrl = ''
    state.qrcodeContent = qrcodeContent
  }
}
