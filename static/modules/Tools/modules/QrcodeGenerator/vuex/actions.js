import {
  API_UPLOAD_BASE64_IMAGE,
  API_UPLOAD_CONTENT_PAGE,
  API_UPLOAD_IMAGE_PAGE,
  API_UPLOAD_FILE_PAGE
} from '../constants/apis'
import { TOOLS_QRCODE_GENERATE_SUCCESS, TOOLS_QRCODE_GENERATOR_MAIN_SET } from '../constants/types'
import { PARAM_TYPES, UPLOAD_FILE_TYPES } from '../constants/constants'
import Session from '../../../../../libs/Session'
import RestUtil from '../../../../../utils/RestUtil'
import StringUtil from '../../../../../utils/StringUtil'
import QrcodeUtil from '../../../../../utils/QrcodeUtil'
import qiniuConfig from '../../../../../config/qiniu'

export const setQrcodeGeneratorState = function ({ commit }, payload) {
  commit(TOOLS_QRCODE_GENERATOR_MAIN_SET, { payload })
}

export const generateTextQrcode = async function ({ commit }, options) {
  const base64Data = await QrcodeUtil.generateThenConvert(options)
  const { domain, uploadToken } = Session.getQiniu()
  const body = {
    content: base64Data,
    uptoken: uploadToken
  }
  const response = await RestUtil.post(API_UPLOAD_BASE64_IMAGE, body)
  const qrcodeUrl = response.body.data.url
  commit(TOOLS_QRCODE_GENERATE_SUCCESS, qrcodeUrl)
}

export const generateLiveTextQrcode = async function ({ commit, state }, options) {
  const { qrcodeContent } = state
  const body = {
    content: qrcodeContent[PARAM_TYPES.TEXT].html,
    accesskey: qiniuConfig.accesskey,
    bucketname: qiniuConfig.bucketname
  }
  const response = await RestUtil.post(API_UPLOAD_CONTENT_PAGE, body)
  options.text = response.body.data.url
  await generateTextQrcode({ commit }, options)
}

export const generateLiveImageQrcode = async function ({ commit, state }, options) {
  const { qrcodeContent, isShowEditor } = state
  const contentKey = isShowEditor ? 'html' : 'text'
  const content = qrcodeContent[PARAM_TYPES.IMAGE]['content'][contentKey]
  const image = qrcodeContent[PARAM_TYPES.IMAGE].image
  const body = {
    image,
    content,
    accesskey: qiniuConfig.accesskey,
    bucketname: qiniuConfig.bucketname
  }
  const response = await RestUtil.post(API_UPLOAD_IMAGE_PAGE, body)
  options.text = response.body.data.url
  await generateTextQrcode({ commit }, options)
}

export const generateLiveFileQrcode = async function ({ commit, state }, options) {
  const { qrcodeContent, isShowEditor } = state
  const contentKey = isShowEditor ? 'html' : 'text'
  const content = qrcodeContent[PARAM_TYPES.FILE]['content'][contentKey]
  const file = qrcodeContent[PARAM_TYPES.FILE].file
  let filetype = UPLOAD_FILE_TYPES.text.icon
  const fileMine = file.key.slice(file.key.lastIndexOf('.') + 1)
  for (const key in UPLOAD_FILE_TYPES) {
    if (UPLOAD_FILE_TYPES.hasOwnProperty(key)) {
      if (UPLOAD_FILE_TYPES[key].mimes && UPLOAD_FILE_TYPES[key].mimes.includes(fileMine)) {
        filetype = UPLOAD_FILE_TYPES[key]['icon']
      }
    }
  }
  const body = {
    file,
    content,
    filetype,
    accesskey: qiniuConfig.accesskey,
    bucketname: qiniuConfig.bucketname
  }
  const response = await RestUtil.post(API_UPLOAD_FILE_PAGE, body)
  options.text = response.body.data.url
  await generateTextQrcode({ commit }, options)
}

export const generateLiveQrcode = async function ({ commit, state }, { options, type = PARAM_TYPES.TEXT }) {
  switch (type) {
    case PARAM_TYPES.TEXT:
      await generateLiveTextQrcode({ commit, state }, options)
      break
    case PARAM_TYPES.IMAGE:
      await generateLiveImageQrcode({ commit, state }, options)
      break
    case PARAM_TYPES.FILE:
      await generateLiveFileQrcode({ commit, state }, options)
      break
    default:
      break
  }
}
