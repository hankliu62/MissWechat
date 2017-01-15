import Qrcode from '../libs/qrcode'

class QrcodeUtil {
  static convertToBase64 (qrcode) {
    const dataURL = qrcode.toDataURL('image/png')
    const base64Data = dataURL.replace(/^data:image\/\w+;base64,/, '')
    return base64Data
  }

  static async generate (options) {
    const qrcodeInstance = new Qrcode(options)
    const qrcode = await qrcodeInstance.create()
    return qrcode
  }

  static async generateThenConvert (options) {
    const qrcode = await QrcodeUtil.generate(options)
    const base64Data = QrcodeUtil.convertToBase64(qrcode)
    return base64Data
  }
}

export default QrcodeUtil
