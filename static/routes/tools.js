import { HEX_CONVERT_ROUTE_PARAMS } from '../constants/constants'

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
      beforeEnter: (to, from, next) => {
        if (to.params.type && !HEX_CONVERT_ROUTE_PARAMS.includes(to.params.type)) {
          next('/error/404');
        }
        next();
      }
    },
    { path: 'hex', redirect: 'hex/encode' },
    {
      path: 'qrcode/:type', // ['qrcode/type', 'qrcode/url']
      name: 'qrcodeGenerator',
      component: function (resolve) {
        require(['../modules/Tools/modules/QrcodeGenerator/QrcodeGeneratorMain'], resolve)
      }
    },
    { path: 'qrcode', redirect: 'qrcode/text' }
  ]
}
