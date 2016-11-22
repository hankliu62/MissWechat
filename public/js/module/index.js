(function () {
  var signature;
  function init (signature) {
    var url = config.service_domain + '/wechat/get_jssdk_signature?url=' + window.location.href

    rest.get(url, function (data) {
      if (data) {
        data = JSON.parse(data)
        if (data.error && console.log) {
          console.log(data.error)
        }
        signature = data.data.signature
        configWechat(signature);
      }
    });

    // var result = fetchJsonp(url, {
    //   timeout: 6000
    // }).then(function (response) {
    //   return response.json()
    // }).then(function (json) {

    // }).catch(function(ex) {
    //   console.log('parsing failed', ex)
    // });

  }

  function configWechat (signature) {
    wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: 'wx3ea0bef99c473ab5', // 必填，公众号的唯一标识
      timestamp: parseInt(signature.timestamp, 10), // 必填，生成签名的时间戳
      nonceStr: signature.noncestr, // 必填，生成签名的随机串
      signature: signature.signature,// 必填，签名，见附录1
      jsApiList: [
        'onMenuShareTimeline',//分享朋友圈
        'onMenuShareAppMessage',//分享给好友
        'onMenuShareQQ',//分享到QQ
        'onMenuShareWeibo'//分享腾讯微博] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      ]
    });

    wx.ready(function () {
      console.log(123);
    });
  }

  init(signature)

})()