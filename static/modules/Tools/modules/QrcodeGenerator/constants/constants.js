import { LANGUAGES } from '../../../../../constants/languages'

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

export const VCARD_PREVIEW_LAYOUT_LEFT = 'left'
export const VCARD_PREVIEW_LAYOUT_MIDDLE = 'middle'
export const VCARD_PREVIEW_LAYOUT_RIGHT = 'right'

export const VCARD_PREVIEW_LAYOUTS = [
  VCARD_PREVIEW_LAYOUT_LEFT,
  VCARD_PREVIEW_LAYOUT_MIDDLE,
  VCARD_PREVIEW_LAYOUT_RIGHT
]

export const DEFAULT_CARD_QRCODE_CONTENT = {
  isShowSaveModal: false,
  isShowPreviewModal: false,
  previewUrl: '', // preview page url
  language: LANGUAGES.ZH_CN,
  selectedModule: '',
  selectedModuleTop: 0,
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
    headerLayout: VCARD_PREVIEW_LAYOUT_LEFT,
    name: { text: '姓名', value: '' },
    appointment: { text: '职位', value: '' },
    company: { text: '公司', value: '' },
    tel: { text: '固定电话', value: '' },
    phone: { text: '移动电话', value: '' },
    fax: { text: '传真', value: '' },
    email: { text: '电子邮箱', value: '' },
    wechat: { text: '微信号', value: '' },
    website: { text: '主页网址', value: '' },
    weibo: { text: '微博', value: '' },
    qq: { text: 'QQ', value: '' },
    address: {
      text: '地址',
      value: {
        province: '',
        city: '',
        county: '',
        town: ''
      },
      point: {
        lng: 0,
        lat: 0
      }
    },
    explanation: {text: '个人说明', value: ''}
  }
}
