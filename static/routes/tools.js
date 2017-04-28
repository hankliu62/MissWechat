import { PARAM_TYPES as HEX_PARAM_TYPES } from '../modules/Tools/modules/HexConverter/constants/constants'
import { PARAM_TYPES as QRCODE_PARAM_TYPES } from '../modules/Tools/modules/QrcodeGenerator/constants/constants'

// Hook for server
if (typeof require.ensure !== 'function') {
  require.ensure = function (dependencies, callback) {
    callback(require);
  }
}

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
    require.ensure([], function (require) {
      require(['../modules/Tools/ToolsMain'], resolve)
    })
  },
  children: [
    {
      path: 'goid/:type',
      name: 'generateObjectId',
      component: function (resolve) {
        require.ensure([], function (require) {
          require(['../modules/Tools/modules/GenerateObjectId/GenerateObjectIdMain'], resolve)
        })
      }
    },
    { path: 'goid', redirect: 'goid/time' },
    {
      path: 'hex/:type', // ['hex/encode', 'hex/decode']
      name: 'hexConverter',
      component: function (resolve) {
        require.ensure([], function (require) {
          require(['../modules/Tools/modules/HexConverter/HexConverterMain'], resolve)
        })
      },
      beforeEnter: checkParamsHooks(Object.values(HEX_PARAM_TYPES))
    },
    { path: 'hex', redirect: 'hex/encode' },
    {
      path: 'qrcode/:type', // ['qrcode/text', 'qrcode/url']
      name: 'qrcodeGenerator',
      component: function (resolve) {
        require.ensure([], function (require) {
          require(['../modules/Tools/modules/QrcodeGenerator/QrcodeGeneratorMain'], resolve)
        })
      },
      beforeEnter: checkParamsHooks(Object.values(QRCODE_PARAM_TYPES))
    },
    { path: 'qrcode', redirect: 'qrcode/text' },
    {
      path: '/',
      name: 'toolsIndex',
      component: function (resolve) {
        require.ensure([], function (require) {
          require(['../modules/Tools/modules/Index/Index'], resolve)
        })
      }
    }
  ]
}
