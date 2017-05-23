import { COMMON_MAIN_SET, FETCH_WECHAT_SIGNATURE, FETCH_QINIU_UPTOKEN } from '../constants/types'
import { SHOW_TOAST, HIDE_TOAST, FETCH_FETCH_LOCAL_REGIONS } from '../../../constants/types'
import { API_FETCH_WECHAT_SIGNATURE, API_FETCH_QINIU_UPTOKEN } from '../constants/apis'
import { API_FETCH_LOCAL_REGIONS } from '../../../constants/apis'
import qiniuConfig from '../../../config/qiniu'
import RestUtil from '../../../utils/RestUtil'
import Session from '../../../libs/Session'

export const setCommonState = function ({ commit }, payload) {
  commit(COMMON_MAIN_SET, payload)
}

export const fetchWechatSignature = async function ({ commit }, options) {
  const response = await RestUtil.get(API_FETCH_WECHAT_SIGNATURE, options)
  const signature = response.body.data.signature
  commit(FETCH_WECHAT_SIGNATURE, signature)
}

export const fetchQiniuUptoken = async function ({ commit }, params = { accesskey: qiniuConfig.accesskey,
  bucketname: qiniuConfig.bucketname }) {
  const response = await RestUtil.get(API_FETCH_QINIU_UPTOKEN, { params })
  const qiniu = { domain: qiniuConfig.domain, uploadToken: response.body.uptoken }
  Session.set('qiniu', qiniu)
  commit(FETCH_QINIU_UPTOKEN, qiniu)
}

export const fetchRegions = async function ({ commit }) {
  const response = await RestUtil.get(API_FETCH_LOCAL_REGIONS)
  console.log(response)
  const regions = response.body.data
  commit(FETCH_FETCH_LOCAL_REGIONS, regions)
}

export const showToast = function ({ commit }, message) {
  commit(SHOW_TOAST, message)
}

export const hideToast = function ({ commit }) {
  commit(HIDE_TOAST)
}
