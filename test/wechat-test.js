var request = require('request');
var wechatConfig = require('../config/wechat');

var url = wechatConfig.api_domain + '/cgi-bin/token?grant_type=client_credential&appid=' +
  wechatConfig.appid + '&secret=' + wechatConfig.appsecret;
request(url, function (error, response, body) {
  console.log(response, body);
  if (!error && response.statusCode == 200) {
    console.log(body);
  }
})