import { PARAM_TYPES as HEX_PARAM_TYPES } from '../modules/Tools/modules/HexConverter/constants/constants'
import { PARAM_TYPES as QRCODE_PARAM_TYPES } from '../modules/Tools/modules/QrcodeGenerator/constants/constants'

const checkParamsHooks = (enableParams = []) => {
  return (to, from, next) => {
    if (to.params.type && !enableParams.includes(to.params.type)) {
      next('/error/404');
    }
    next();
  }
}

export default {
  path: '/tools',
  component: function (resolve) {
    require(['../modules/Tools/ToolsMain'], resolve)
  },
  children: [
    {
      path: 'goid/:type',
      name: 'generateObjectId',
      component: function (resolve) {
        require(['../modules/Tools/modules/GenerateObjectId/GenerateObjectIdMain'], resolve)
      }
    },
    { path: 'goid', redirect: 'goid/time' },
    {
      path: 'hex/:type', // ['hex/encode', 'hex/decode']
      name: 'hexConverter',
      component: function (resolve) {
        require(['../modules/Tools/modules/HexConverter/HexConverterMain'], resolve)
      },
      beforeEnter: checkParamsHooks(Object.values(HEX_PARAM_TYPES))
    },
    { path: 'hex', redirect: 'hex/encode' },
    {
      path: 'qrcode/:type', // ['qrcode/text', 'qrcode/url']
      name: 'qrcodeGenerator',
      component: function (resolve) {
        require(['../modules/Tools/modules/QrcodeGenerator/QrcodeGeneratorMain'], resolve)
      },
      beforeEnter: checkParamsHooks(Object.values(QRCODE_PARAM_TYPES))
    },
    { path: 'qrcode', redirect: 'qrcode/text' }
  ]
}
