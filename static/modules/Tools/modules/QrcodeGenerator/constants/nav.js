import { PARAM_TYPES } from './constants'

export const QRCODE_GENERATOR_MAIN_NAVS = [
  {
    name: '文本',
    link: `/tools/qrcode/${PARAM_TYPES.TEXT}`
  },
  {
    name: '网址',
    link: `/tools/qrcode/${PARAM_TYPES.URL}`
  }
]
