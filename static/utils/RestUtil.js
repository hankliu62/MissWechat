import Vue from 'vue';
import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.http.interceptors.push((request, next) => {
  // continue to next interceptor
  request.timeout = 6000

  const current = new Date()
  const tmoffset = current.getTimezoneOffset() / 60
  const params = {
    ...(request.params || {}),
    time: current.valueOf(),
    tmoffset
  }

  request.params = params

  next(function (response) {
    // Todo: common error handler
    if (response.status === 404) {
      // Todo
    }
  })
})

export default Vue.http
