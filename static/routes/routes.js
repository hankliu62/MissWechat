import Common from '../modules/Common/Common'

export default [
  {
    path: '/',
    component: Common,
    children: [
      {
        path: '/index',
        component: function (resolve) {
          require(['../modules/Home/HomeMain'], resolve)
        }
      },
      {
        path: '/error/:code',
        component: function (resolve) {
          require(['../modules/Error/Error'], resolve)
        }
      },
      { path: '', redirect: '/index' }
    ]
  }
];
