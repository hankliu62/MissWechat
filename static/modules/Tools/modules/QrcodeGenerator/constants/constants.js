export const PARAM_TYPES = {
  TEXT: 'text',
  URL: 'url',
  VCARD: 'vcard',
  FILE: 'file',
  IMAGE: 'image',
  WECHAT: 'wechat'
}

export const QRCODE_TOOLS_TAB_TYPES = {
  BASIC: 'basic',
  COLOR: 'color',
  LOGO: 'logo'
}

export const QRCODE_TOOLS_TABS = [
  {
    name: '基本',
    value: QRCODE_TOOLS_TAB_TYPES.BASIC
  },
  {
    name: '颜色',
    value: QRCODE_TOOLS_TAB_TYPES.COLOR
  },
  {
    name: 'LOGO',
    value: QRCODE_TOOLS_TAB_TYPES.LOGO
  }
]

export const FAULT_TOLERANCE_LEVELS = [
  {
    value: 3,
    label: '30%'
  },
  {
    value: 2,
    label: '20%'
  },
  {
    value: 1,
    label: '12%'
  },
  {
    value: 0,
    label: '6%'
  }
]
