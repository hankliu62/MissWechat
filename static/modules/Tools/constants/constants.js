export const SUCCESS_RESULT = {
  statusCode: 200,
  statusMessage: 'OK'
}

export const ERROR_RESULT = {
  statusCode: 400,
  statusMessage: 'Bad Request'
}

export const TOOLS_MENUS = [
  {
    name: 'generateObjectId',
    title: 'UUID生成器',
    link: '/tools/goid/time'
  },
  {
    name: 'qrcodeGenerator',
    title: 'Qrcode生成器',
    link: '/tools/qrcode/text'
  },
  {
    name: 'hexConverter',
    title: 'Hex转换器',
    link: '/tools/hex/encode'
  }
]
