import { COMMON_MAIN_SET, FETCH_WECHAT_SIGNATURE, FETCH_QINIU_UPTOKEN } from '../constants/types'
import { SHOW_TOAST, HIDE_TOAST, FETCH_FETCH_LOCAL_REGIONS } from '../../../constants/types'

export default {
  [COMMON_MAIN_SET] (state, payload) {
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        state[key] = payload[key]
      }
    }
  },
  [FETCH_WECHAT_SIGNATURE] (state, signature) {
    state.signature = signature
  },
  [FETCH_QINIU_UPTOKEN] (state, qiniu) {
    state.qiniu = qiniu
  },
  [SHOW_TOAST] (state, message) {
    state.toast.count = ++state.toast.count
    state.toast.content = message
  },
  [HIDE_TOAST] (state) {
    state.toast.count = --state.toast.count
    state.toast.content = ''
  },
  [FETCH_FETCH_LOCAL_REGIONS] (state, regions) {
    state.regions = regions
  }
}
