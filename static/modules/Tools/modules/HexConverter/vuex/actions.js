import {
  TOOLS_HEX_CONVERT_SUCCESS,
  TOOLS_HEX_CONVERT_FAIL,
  TOOLS_HEX_CONVERTER_MAIN_SET,
  TOOLS_HEX_GET_LOADFILE_CONTENT
} from '../constants/types'
import { API_HEX_CONVERT, API_GET_LOADFILE_CONTENT } from '../constants/apis'
import StatusCodes from '../../../../../constants/status-codes'
import RestUtil from '../../../../../utils/RestUtil'

export const setHexConverterState = ({ commit }, payload) => {
  commit(TOOLS_HEX_CONVERTER_MAIN_SET, { payload })
};

export const convert = async ({ commit }, options) => {
  const response = await RestUtil.post(API_HEX_CONVERT, options)
  const body = response.body
  const code = body.statusCode
  const data = body.data
  if (StatusCodes.SUCCESS === code) {
    commit(TOOLS_HEX_CONVERT_SUCCESS, { result: data.result })
  } else {
    commit(TOOLS_HEX_CONVERT_FAIL, {
      statusCode: code,
      name: data.name || 'Bad Request',
      message: data.messages[0] ? data.messages[0].values()[0] : data.error.toString()
    })
  }
};

export const getLoadFileContent = async ({ commit }, url) => {
  if (url) {
    const options = { params: { url: encodeURIComponent(url) } }
    const response = await RestUtil.get(API_GET_LOADFILE_CONTENT, options)
    commit(TOOLS_HEX_GET_LOADFILE_CONTENT, { code: response.body })
  }
}
