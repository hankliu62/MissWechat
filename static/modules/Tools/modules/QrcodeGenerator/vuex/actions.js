import { API_GENERATE_OBJECTIDS } from '../../GenerateObjectId/constants/apis'
import { TOOLS_QRCODE_GENERATE_SUCCESS } from '../constants/types'
import Session from '../../../../../libs/Session'
import RestUtil from '../../../../../utils/RestUtil'
import StringUtil from '../../../../../utils/StringUtil'
import qiniuConfig from '../../../../../config/qiniu'

export const generateTextQrcode = async function ({ commit }, body) {
  const qiniu = Session.getQiniu()
  const { domain, uploadToken } = qiniu
  const authorization = `UpToken ${uploadToken}`
  const options = {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Authorization': authorization
    },
    params: {
      isExternalUrl: true
    }
  }
  const generateIdsResponse = await RestUtil.post(API_GENERATE_OBJECTIDS, {
    type: 'time',
    code: `${~~(new Date().valueOf() / 1000)}`,
    number: 1
  });
  const keyName = `${generateIdsResponse.body.data.items[0]}.png`
  const serverUrl = `${qiniuConfig.uploadBase64Url}/key/${StringUtil.base64Encode(keyName)}`
  const response = await RestUtil.post(serverUrl, body, options)
  const qrcodeUrl = `${domain}/${response.body.key}`
  commit(TOOLS_QRCODE_GENERATE_SUCCESS, qrcodeUrl)
}
