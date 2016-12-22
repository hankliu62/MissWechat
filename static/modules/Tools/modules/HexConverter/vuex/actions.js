import {
  TOOLS_HEX_CONVERT_SUCCESS,
  TOOLS_HEX_CONVERT_FAIL,
  TOOLS_HEX_CONVERTER_MAIN_SET
} from '../constants/types'
import { API_HEX_CONVERT } from '../constants/apis'
import StatusCodes from '../../../../../constants/status-codes'
import RestUtil from '../../../../../utils/RestUtil'

export const setHexConverterState = ({ commit }, payload) => {
  commit(TOOLS_HEX_CONVERTER_MAIN_SET, { payload })
}

export const convert = async ({ commit }, options) => {
  const response = await RestUtil.post(API_HEX_CONVERT, options)
  const data = response.body.data
  if (StatusCodes.SUCCESS === data.statusCode) {
    commit(TOOLS_HEX_CONVERT_SUCCESS, { result: data.result })
  } else {
    commit(TOOLS_HEX_CONVERT_FAIL, {
      statusCode: data.statusCode,
      name: data.name || 'Bad Request',
      message: data.messages[0] ? data.messages[0].values()[0] : data.error.toString()
    })
  }
}
