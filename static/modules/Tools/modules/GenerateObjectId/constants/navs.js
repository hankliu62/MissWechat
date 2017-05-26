import ObjectUtil from '../../../../../utils/ObjectUtil'

export const GENERATE_OBJECTID_MAIN_NAVS = [
  {
    name: 'Time ObjectId',
    link: '/tools/goid/time',
    demo: ObjectUtil.generateObjectId(Math.floor(new Date().valueOf() / 1000))
  },
  {
    name: 'Hex ObjectId',
    link: '/tools/goid/hex',
    demo: ObjectUtil.generateObjectId(353434393561643934633933343732316564653736643930)
  },
  {
    name: 'String ObjectId',
    link: '/tools/goid/string',
    demo: ObjectUtil.generateObjectId('54495ad94c934721ede76d90')
  },
  {
    name: 'Array ObjectId',
    link: '/tools/goid/array',
    demo: ObjectUtil.generateObjectId([ 2, 4, 8, 15, 16, 23, 42, 62, 108, 78, 54, 20 ])
  },
  {
    name: 'Buffer ObjectId',
    link: '/tools/goid/buffer',
    demo: ObjectUtil.generateObjectId(new Buffer([ 20, 54, 78, 108, 62, 42, 23, 16, 15, 8, 4, 2 ]))
  },
  {
    name: 'Empty ObjectId',
    link: '/tools/goid/empty',
    demo: ObjectUtil.generateObjectId()
  }
]
