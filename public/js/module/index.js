(function () {
  var signature;
  function init (signature) {
    // var url = config.service_domain + '/wechat/get_jssdk_signature?url=' + window.location.href
    // rest.get(url, function (data) {
    //   if (data) {
    //     data = JSON.parse(data);
    //     if (data.error && console.log) {
    //       console.log(data.error);
    //       return;
    //     }
    //     signature = data.data.signature;
    //     configWechat(signature);
    //   }
    // });

    var params = {
      path: decodeURIComponent('/wechat/get_jssdk_signature'),
      method: 'get'
    };
    var query = '';
    for (var key in params) {
      query += '&' + key + '=' + params[key];
    }
    query = query.replace(/^&/, '?')
    var url = config.service_domain + '/jsonp/jsonp_proxy' + query
    var result = fetchJsonp(url, {
      timeout: 6000
    }).then(function (response) {
      return response.json()
    }).then(function (data) {
      if (data.statusCode !== 200) {
        console.log(data.error);
        return;
      }

      signature = data.data.signature
      configWechat(signature);
    }).catch(function(ex) {
      console.log('parsing failed', ex);
    });
  }

  function configWechat (signature) {
    wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: signature.appid, // 必填，公众号的唯一标识
      timestamp: parseInt(signature.timestamp, 10), // 必填，生成签名的时间戳
      nonceStr: signature.noncestr, // 必填，生成签名的随机串
      signature: signature.signature,// 必填，签名，见附录1
      jsApiList: [
        'onMenuShareTimeline',//分享朋友圈
        'onMenuShareAppMessage',//分享给好友
        'onMenuShareQQ',//分享到QQ
        'onMenuShareWeibo',//分享腾讯微博] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        'hideAllNonBaseMenuItem',
        'chooseImage'
      ]
    });

    wx.ready(function () {
      wx.hideAllNonBaseMenuItem();

      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        }
      });
    });
  }

  init(signature)

})()