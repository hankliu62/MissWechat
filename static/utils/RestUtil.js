import Vue from 'vue';
import VueResource from 'vue-resource'
import StatusCodes from '../constants/status-codes'
import store from '../vuex/store'
import { SHOW_TOAST, HIDE_TOAST } from '../constants/types'

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
    if (response.status === StatusCodes.NOT_FOUND) {
      // Todo
    }

    if (response.status === StatusCodes.BAD_REQUEST) {
      if (response.body && response.body.error) {
        store.commit(SHOW_TOAST, response.body.error);

        setTimeout(function () {
          store.commit(HIDE_TOAST);
        }, 3000)
      }
    }
  })
})

export default Vue.http
