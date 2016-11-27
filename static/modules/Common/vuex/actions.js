import * as TYPES from '../constants/types'
import { API_FETCH_WECHAT_SIGNATURE } from '../constants/apis'
import RestUtil from '../../../utils/RestUtil'
import config from '../../../config/config'

export const setState = function ({ commit }, payload) {
  commit(TYPES.COMMON_MAIN_SET, payload)
}

export const fetchWechatSignature = async function ({ commit }, options) {
  const url = `${config.service_domain}${API_FETCH_WECHAT_SIGNATURE}`
  const response = await RestUtil.get(url, options)
  const signature = response.body.data
  commit(TYPES.FETCH_WECHAT_SIGNATURE, signature)
}

export const showToast = function ({ commit }, message) {
  console.log(message);
  commit(TYPES.SHOW_TOAST, message)
}

export const hideToast = function ({ commit }) {
  commit(TYPES.HIDE_TOAST)
}
