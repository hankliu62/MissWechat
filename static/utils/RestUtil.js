import Vue from 'vue'
import VueResource from 'vue-resource'
import StatusCodes from '../constants/status-codes'
import config from '../config/config'
import store from '../vuex/store'
import { showLoading } from '../utils/LoadingUtil'
import { SHOW_TOAST, HIDE_TOAST } from '../constants/types'

Vue.use(VueResource)

const showApiLoading = (params) => {
  if (params && 'noLoading' in params && params.noLoading) {
    return;
  }

  return showLoading()
}

Vue.http.interceptors.push((request, next) => {
  const loadinger = showApiLoading()

  // continue to next interceptor
  request.timeout = 6000

  const current = new Date()
  const tmoffset = current.getTimezoneOffset() / 60
  request.params = {
    ...(request.params || {}),
    time: current.valueOf(),
    tmoffset
  }

  request.url = request.params.isExternalUrl ? request.url : `${config.service_domain}${request.url}`
  delete request.params.isExternalUrl

  next(function (response) {
    if (loadinger) {
      loadinger.close()
    }

    // Todo: common error handler
    if (response.status === StatusCodes.NOT_FOUND) {
      // Todo: support use vue-router to route 404 page
      window.location.href = '/error/404'
    }

    if (response.status === StatusCodes.BAD_REQUEST) {
      if (response.body && response.body.error) {
        store.commit(SHOW_TOAST, response.body.error)

        setTimeout(function () {
          store.commit(HIDE_TOAST)
        }, 3000)
      }
    } else if (response.status === StatusCodes.INVALID_PARAMETER) {
      if (response.body && response.body.messages && response.body.messages.length) {
        const messages = response.body.messages
        let message = ''
        for (const item of messages) {
          for (const key in item) {
            if (item.hasOwnProperty(key)) {
              message += `${key}: ${item[key]} \r\n`
            }
          }
        }
        store.commit(SHOW_TOAST, message)

        setTimeout(function () {
          store.commit(HIDE_TOAST)
        }, 3000)
      }
    }
  })
})

export default Vue.http
