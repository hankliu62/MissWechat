import Loading from './Loading'
import Notification from './Notification'

const install = function (Vue, opts = {}) {
  /* istanbul ignore if */
  if (install.installed) return
  Vue.prototype.$loading = Loading.service
  Vue.prototype.$notification = Notification.service
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
};

export {
  install,
  Loading,
  Notification
}
