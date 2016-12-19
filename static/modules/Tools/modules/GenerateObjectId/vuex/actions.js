import {
  TOOLS_GENERATE_OBJECTIDS_SUCCESS,
  TOOLS_GENERATE_OBJECTIDS_FAIL,
  TOOLS_GENERATE_MAIN_SET
} from '../constants/types'
import { PARAM_TYPES } from '../constants/constants'
import { generateObjectId } from '../../../../../utils/ObjectUtil'

export const setState = ({ commit }, payload) => {
  commit(TOOLS_GENERATE_MAIN_SET, payload)
}

export const createObjectIds = ({ commit }, { param, number = 1, type }) => {
  const objectIds = []
  let index = 0

  try {
    while (++index <= number) {
      if (param) {
        let objectId

        switch (type) {
          case PARAM_TYPES.TIME:
            param = parseFloat(param)
            if (!param) {
              throw new Error('param type should be date time (in seconds)')
            }
            objectId = generateObjectId(param)
            param += 1
            break
          case PARAM_TYPES.HEX:
            param = parseFloat(param)
            if (!param) {
              throw new Error('Param type should be a 24 character hex string')
            }
            objectId = generateObjectId(param)
            param += 1
            break
          case PARAM_TYPES.ARRAY:
          case PARAM_TYPES.BUFFER:
          case PARAM_TYPES.STRING:
          case PARAM_TYPES.EMPTY:
            objectId = generateObjectId(param)
            break
        }

        objectIds.push(objectId)
      } else {
        objectIds.push(generateObjectId())
      }
    }
    commit(TOOLS_GENERATE_OBJECTIDS_SUCCESS, objectIds)
  } catch (error) {
    const payload = {
      error: error.toString()
    }
    commit(TOOLS_GENERATE_OBJECTIDS_FAIL, payload)
  }
}
