import Vue from 'vue'
import VueResource from 'vue-resource'
import StatusCodes from '../constants/status-codes'
import config from '../config/config'
import store from '../vuex/store'
import { showLoading } from '../utils/LoadingUtil'
import * as ObjectUtil from '../utils/ObjectUtil'
import { SHOW_TOAST, HIDE_TOAST } from '../constants/types'
import { Notification } from '../services'

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

    // common error handler
    switch (response.status) {
      case StatusCodes.NOT_FOUND:
        // Todo: support use vue-router to route 404 page
        window.location.href = '/error/404'
        break
      case StatusCodes.BAD_REQUEST:
        if (response.body && response.body.error) {
          Notification.service({content: response.body.error, type: 'error'})
        }
        break
      case StatusCodes.INVALID_PARAMETER:
        if (response.body && response.body.messages) {
          const messages = response.body.messages
          if (ObjectUtil.isArray(messages)) {
            let message = ''
            for (const item of messages) {
              if (ObjectUtil.isObject(item)) {
                for (const key in item) {
                  if (item.hasOwnProperty(key)) {
                    message += `${key}: ${item[key]} \r\n`
                  }
                }
              } else {
                message += `${item} \r\n`
              }
            }
            message = message.replace(/\s\r\n$/, '')
            Notification.service({content: message, type: 'error'})
          } else if (ObjectUtil.isString(messages)) {
            Notification.service({content: messages, type: 'error'})
          }
        }
        break
      default:
        break
    }
  })
})

export default Vue.http
