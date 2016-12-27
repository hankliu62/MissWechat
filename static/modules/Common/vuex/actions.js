import { COMMON_MAIN_SET, FETCH_WECHAT_SIGNATURE } from '../constants/types'
import { SHOW_TOAST, HIDE_TOAST } from '../../../constants/types'
import { API_FETCH_WECHAT_SIGNATURE } from '../constants/apis'
import RestUtil from '../../../utils/RestUtil'

export const setCommonState = function ({ commit }, payload) {
  commit(COMMON_MAIN_SET, payload)
}

export const fetchWechatSignature = async function ({ commit }, options) {
  const response = await RestUtil.get(API_FETCH_WECHAT_SIGNATURE, options)
  const signature = response.body.data.signature
  commit(FETCH_WECHAT_SIGNATURE, signature)
}

export const showToast = function ({ commit }, message) {
  commit(SHOW_TOAST, message)
}

export const hideToast = function ({ commit }) {
  commit(HIDE_TOAST)
}
