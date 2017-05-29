import ObjectUtil from '../../../../../utils/ObjectUtil'

export const PARAM_TYPES = {
  TIME: 'time',
  HEX: 'hex',
  STRING: 'string',
  ARRAY: 'array',
  BUFFER: 'buffer',
  EMPTY: 'empty'
}

export const GENERATE_OBJECTID_TYPES = [
  {
    param: {
      name: 'Params: Time',
      type: 'Date',
      desc: 'Constructs the instance based on the specified time (in seconds)'
    },
    type: PARAM_TYPES.TIME
  },
  {
    param: {
      name: 'Params: Hex',
      type: 'Int32',
      desc: 'Constructs the instance from a 24 character hex string'
    },
    type: PARAM_TYPES.HEX
  },
  {
    param: {
      name: 'Params: String',
      type: 'String',
      desc: 'Constructs the instance from a 12 byte string'
    },
    type: PARAM_TYPES.STRING
  },
  {
    param: {
      name: 'Params: Array',
      type: 'Array',
      desc: 'Constructs the instance from an Array of 24 bytes'
    },
    type: PARAM_TYPES.ARRAY
  },
  {
    param: {
      name: 'Params: Buffer',
      type: 'Buffer',
      desc: 'Constructs the instance from a 24 byte Buffer instance'
    },
    type: PARAM_TYPES.BUFFER
  },
  {
    type: PARAM_TYPES.EMPTY
  }
]

export const SUCCESS_RESULT = {
  statusCode: 200,
  statusMessage: 'OK'
}

export const ERROR_RESULT = {
  statusCode: 400,
  statusMessage: 'Bad Request'
}

export const DEFALUT_CODE_TABS = {
  tab: 'results',
  panel: 'results-panel'
}

export const METADATAS = {
  [PARAM_TYPES.TIME]: {
    rows: [
      '<span>params: </span>',
      '<span>1482154744</span>',
      '<span><br/></span>',
      '<span>number: </span>',
      '<span>1</span>',
      '<span><br/></span>',
      '<span>result: </span>',
      `<span>${ObjectUtil.generateObjectId(1482154744)}</span>`
    ]
  },
  [PARAM_TYPES.HEX]: {
    rows: [
      '<span>params: </span>',
      '<span>353434393561643934633933343732316564653736643930</span>',
      '<span><br/></span>',
      '<span>number: </span>',
      '<span>1</span>',
      '<span><br/></span>',
      '<span>result: </span>',
      `<span>${ObjectUtil.generateObjectId(353434393561643934633933343732316564653736643930)}</span>`
    ]
  },
  [PARAM_TYPES.STRING]: {
    rows: [
      '<span>params: </span>',
      '<span>\'54495ad94c934721ede76d90\'</span>',
      '<span><br/></span>',
      '<span>number: </span>',
      '<span>1</span>',
      '<span><br/></span>',
      '<span>result: </span>',
      `<span>${ObjectUtil.generateObjectId('54495ad94c934721ede76d90')}</span>`
    ]
  },
  [PARAM_TYPES.ARRAY]: {
    rows: [
      '<span>params: </span>',
      '<span>\'2, 4, 8, 15, 16, 23, 42, 62, 108, 78, 54, 20\'</span>',
      '<span><br/></span>',
      '<span>number: </span>',
      '<span>1</span>',
      '<span><br/></span>',
      '<span>result: </span>',
      `<span>${ObjectUtil.generateObjectId([ 2, 4, 8, 15, 16, 23, 42, 62, 108, 78, 54, 20 ])}</span>`
    ]
  },
  [PARAM_TYPES.BUFFER]: {
    rows: [
      '<span>params: </span>',
      '<span>\'20, 54, 78, 108, 62, 42, 23, 16, 15, 8, 4, 2\'</span>',
      '<span><br/></span>',
      '<span>number: </span>',
      '<span>1</span>',
      '<span><br/></span>',
      '<span>result: </span>',
      `<span>${ObjectUtil.generateObjectId(new Buffer([ 20, 54, 78, 108, 62, 42, 23, 16, 15, 8, 4, 2 ]))}</span>`
    ]
  },
  [PARAM_TYPES.EMPTY]: {
    rows: [
      '<span>number: </span>',
      '<span>1</span>',
      '<span><br/></span>',
      '<span>result: </span>',
      `<span>${ObjectUtil.generateObjectId()}</span>`
    ]
  }
}

