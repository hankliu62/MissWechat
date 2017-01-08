import Loading from './Loading'

const install = function (Vue, opts = {}) {
  /* istanbul ignore if */
  if (install.installed) return;
  Vue.prototype.$loading = Loading.service;
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export {
  install,
  Loading
}
