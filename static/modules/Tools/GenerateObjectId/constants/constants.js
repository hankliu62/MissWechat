export const GENERATE_OBJECTID_TYPES = [
  {
    param: {
      name: 'Params: Time',
      type: 'Date',
      desc: 'Constructs the instance based on the specified time (in seconds)'
    },
    type: 'time'
  },
  {
    param: {
      name: 'Params: Hex',
      type: 'Int32',
      desc: 'Constructs the instance from a 24 character hex string'
    },
    type: 'hex'
  },
  {
    param: {
      name: 'Params: String',
      type: 'String',
      desc: 'Constructs the instance from a 12 byte string'
    },
    type: 'string'
  },
  {
    param: {
      name: 'Params: Array',
      type: 'Array',
      desc: 'Constructs the instance from an Array of 24 bytes'
    },
    type: 'array'
  },
  {
    param: {
      name: 'Params: Buffer',
      type: 'Buffer',
      desc: 'Constructs the instance from a 24 byte Buffer instance'
    },
    type: 'buffer'
  },
  {
    type: 'empty'
  }
]
