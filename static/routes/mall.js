export default {
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
}
