import * as TYPES from '../constants/types'

export default {
  [TYPES.COMMON_MAIN_SET] (state, payload) {
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        state[key] = payload[key]
      }
    }
  },
  [TYPES.FETCH_WECHAT_SIGNATURE] (state, payload) {
    state.signature = payload.signature
  },
  [TYPES.SHOW_TOAST] (state, message) {
    state.toast.count = ++state.toast.count
    state.toast.content = message
  },
  [TYPES.HIDE_TOAST] (state) {
    state.toast.count = --state.toast.count
    state.toast.content = ''
  }
}
