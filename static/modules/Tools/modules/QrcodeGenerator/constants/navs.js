import { PARAM_TYPES } from './constants'

export const QRCODE_GENERATOR_MAIN_NAVS = [
  {
    name: '文本',
    link: `/tools/qrcode/${PARAM_TYPES.TEXT}`
  },
  {
    name: '网址',
    link: `/tools/qrcode/${PARAM_TYPES.URL}`
  },
  {
    name: '名片',
    link: `/tools/qrcode/${PARAM_TYPES.VCARD}`
  },
  {
    name: '文件',
    link: `/tools/qrcode/${PARAM_TYPES.FILE}`
  },
  {
    name: '图片',
    link: `/tools/qrcode/${PARAM_TYPES.IMAGE}`
  },
  {
    name: '微信',
    link: `/tools/qrcode/${PARAM_TYPES.WECHAT}`
  }
]
