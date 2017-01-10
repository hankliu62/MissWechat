import { QRCODE_GENERATOR_MAIN_NAVS } from '../constants/navs'
import {
  DEFAULT_FAULT_TOLERANCE_LEVEL,
  DEFAULT_QRCODE_SIZE,
  DEFAULT_QRCODE_FOREGROUND,
  DEFAULT_QRCODE_BACKGROUND,
  PARAM_TYPES
} from '../constants/constants'

export default {
  nav: {
    items: QRCODE_GENERATOR_MAIN_NAVS
  },
  qrcodeUrl: '',
  faultToleranceLevel: DEFAULT_FAULT_TOLERANCE_LEVEL,
  size: DEFAULT_QRCODE_SIZE,
  foreground: DEFAULT_QRCODE_FOREGROUND,
  background: DEFAULT_QRCODE_BACKGROUND,
  logoUrl: '',
  qrcodeContent: {
    [PARAM_TYPES.TEXT]: '',
    [PARAM_TYPES.URL]: '',
    [PARAM_TYPES.VCARD]: '',
    [PARAM_TYPES.FILE]: '',
    [PARAM_TYPES.IMAGE]: '',
    [PARAM_TYPES.WECHAT]: ''
  }
}
