import { QRCODE_GENERATOR_MAIN_NAVS } from '../constants/navs'
import {
  DEFAULT_FAULT_TOLERANCE_LEVEL,
  DEFAULT_QRCODE_SIZE,
  DEFAULT_QRCODE_FOREGROUND,
  DEFAULT_QRCODE_BACKGROUND,
  PARAM_TYPES,
  VCARD_COVER_IMAGE_TYPE,
  VCARD_PREVIEW_LAYOUT_LEFT
} from '../constants/constants'
import { LANGUAGES } from '../../../../../constants/languages'

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
  isShowEditor: false,
  qrcodeContent: {
    [PARAM_TYPES.TEXT]: {
      text: '',
      html: ''
    },
    [PARAM_TYPES.URL]: '',
    [PARAM_TYPES.VCARD]: {
      language: LANGUAGES.ZH_CN,
      selectedModule: '',
      data: {
        avatar: '',
        cover: {
          value: 'http://oiq00n80p.bkt.clouddn.com/vcard_cover_bg23.jpg',
          type: VCARD_COVER_IMAGE_TYPE
        },
        lastCover: {
          value: 'http://oiq00n80p.bkt.clouddn.com/vcard_cover_bg23.jpg',
          type: VCARD_COVER_IMAGE_TYPE
        },
        selectedPreviewLayout: VCARD_PREVIEW_LAYOUT_LEFT,
        name: {
          text: '姓名',
          value: ''
        },
        appointment: {
          text: '职位',
          value: ''
        },
        company: {
          text: '公司',
          value: ''
        }
      }
    },
    [PARAM_TYPES.FILE]: {
      file: {
        key: '',
        url: ''
      },
      content: {
        text: '',
        html: ''
      }
    },
    [PARAM_TYPES.IMAGE]: {
      image: {
        key: '',
        url: ''
      },
      content: {
        text: '',
        html: ''
      }
    },
    [PARAM_TYPES.WECHAT]: {
      public: {
        name: ''
      },
      personal: {}
    }
  }
}
