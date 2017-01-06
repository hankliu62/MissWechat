import { TOOLS_QRCODE_GENERATE_SUCCESS } from '../constants/types'
import Session from '../../../../../libs/Session'
import RestUtil from '../../../../../utils/RestUtil'
import qiniuConfig from '../../../../../config/qiniu'

export const generateTextQrcode = async function ({ commit }, url) {
  const qiniu = Session.getQiniu()
  const response = await RestUtil.post(qiniuConfig.uploadBase64Url, {}, url)
  commit(TOOLS_QRCODE_GENERATE_SUCCESS)
}
