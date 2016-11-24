export default [
  {
    path: '/',
    component: function (resolve) {
      require(['../modules/Goods/GoodsMain'], resolve)
    }
  }
];
