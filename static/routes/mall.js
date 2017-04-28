// Hook for server
if (typeof require.ensure !== 'function') {
  require.ensure = function (dependencies, callback) {
    callback(require);
  }
}

export default {
  path: '/',
  component: function (resolve) {
    require.ensure([], (require) => {
      require(['../modules/Common/Common'], resolve)
    })
  },
  children: [
    {
      path: 'index',
      name: 'index',
      component: function (resolve) {
        require.ensure([], function (require) {
          require(['../modules/Home/HomeMain'], resolve)
        })
      },
      meta: { requireWechatConfig: true, fullscreen: true }
    },
    {
      path: 'error/:code',
      name: 'error',
      component: function (resolve) {
        require.ensure([], function (require) {
          require(['../modules/Error/Error'], resolve)
        })
      },
      meta: { fullscreen: true }
    },
    { path: '', redirect: '/index' }
  ]
}
