import { Loading } from 'element-ui'

export const showLoading = (options) => {
  return Loading.service({ fullscreen: true, customClass: 'hk-loading-mask', ...options })
}
