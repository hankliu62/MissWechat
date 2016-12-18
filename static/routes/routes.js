export default [
  {
    path: '/',
    component: function (resolve) {
      require(['../modules/Common/Common'], resolve)
    },
    children: [
      {
        path: 'index',
        name: 'index',
        component: function (resolve) {
          require(['../modules/Home/HomeMain'], resolve)
        },
        meta: { requireWechatConfig: true }
      },
      {
        path: 'error/:code',
        name: 'error',
        component: function (resolve) {
          require(['../modules/Error/Error'], resolve)
        }
      },
      { path: '', redirect: '/index' }
    ]
  },
  {
    path: '/tools',
    component: function (resolve) {
      require(['../modules/Tools/ToolsMain'], resolve)
    },
    children: [
      {
        path: 'goid/:type',
        name: 'generateObjectId',
        component: function (resolve) {
          require(['../modules/Tools/GenerateObjectId/GenerateObjectIdMain'], resolve)
        }
      },
      { path: 'goid', redirect: 'goid/time' }
    ]
  },
  { path: '*', redirect: '/error/404' } // if not matched any route state, turn to 404 page
];
