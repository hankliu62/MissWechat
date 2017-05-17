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

export const QRCODE_WECHAT_TAB_TYPES = {
  PERSONAL: 'personal',
  PUBLIC: 'public'
}

export const QRCODE_WECHAT_TYPE_TABS = [
  {
    name: '公众号',
    value: QRCODE_WECHAT_TAB_TYPES.PUBLIC
  },
  {
    name: '个人账户',
    value: QRCODE_WECHAT_TAB_TYPES.PERSONAL
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

export const DEFAULT_FAULT_TOLERANCE_LEVEL = FAULT_TOLERANCE_LEVELS[0].value
export const DEFAULT_QRCODE_SIZE = 300
export const DEFAULT_QRCODE_FOREGROUND = '#000000'
export const DEFAULT_QRCODE_BACKGROUND = '#FFFFFF'

export const UPLOAD_FILE_TYPES = {
  text: {
    title: '文档类',
    mimes: ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'vcf', 'pot', 'potx', 'xls', 'xlsx', 'txt', 'rtf', 'wps', 'dps'],
    icon: 'http://oiq00n80p.bkt.clouddn.com/icon-textfile.png'
  },
  image: {
    title: '图片类',
    mimes: ['jpg', 'jpeg', 'gif', 'png', 'bmp'],
    icon: 'http://oiq00n80p.bkt.clouddn.com/icon-imagefile.png'
  },
  video: {
    title: '音频类',
    mimes: ['mp3', 'wma', 'mid'],
    icon: 'http://oiq00n80p.bkt.clouddn.com/icon-videofile.png'
  }
}

export const VCARD_MODULE = {
  Basic: 'basic',
  Contact: 'contact',
  Account: 'account',
  Address: 'address',
  Explanation: 'explanation'
}

export const VCARD_COVER_IMAGE_TYPE = 'image'
export const VCARD_COVER_PURE_TYPE = 'pure'
