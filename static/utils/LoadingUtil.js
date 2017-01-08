import { Loading } from '../services'

export const showLoading = (options) => {
  return Loading.service({ fullscreen: true, customClass: 'hk-loading-mask', ...options })
}
