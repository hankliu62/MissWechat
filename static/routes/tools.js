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
      }
    },
    { path: 'hex', redirect: 'hex/decode' }
  ]
}
