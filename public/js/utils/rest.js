(function (w) {
  var rest = {};

  function getAjaxRest () {
    var get = function (url, fn) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState = 4 && (xhr.status === 200 || xhr.status === 304)) {
          if (fn) {
            fn.call(null, xhr.responseText);
          }
        }
      }
      xhr.send();
    }

    return { get: get };
  }

  function getJsonpRest () {
    function Jsonp () {
      this.requestSuccessCallback = function () {};
      this.requestFailCallback =  function () {};
      this.responseSuccessCallback = function (data) {
        return data;
      };
      this.responseFailCallback = function (error) {
        return error;
      };
      this.interceptors = {
        request: {
          use: function (successCallback, failCallback) {
            this.requestSuccessCallback = successCallback || this.requestSuccessCallback;
            this.requestFailCallback = failCallback || this.requestFailCallback;
          }
        },
        response: {
          use: function (successCallback, failCallback) {
            this.responseSuccessCallback = successCallback || this.responseSuccessCallback;
            this.responseFailCallback = failCallback || this.responseFailCallback;
          }
        }
      }

      this.get = function (url, config, resolve, reject) {
        if (typeof config === 'function') {
          reject = resolve;
          resolve = config;
        }

        var params = { method: 'get', url: url, config: config, data: null, resolve: resolve, reject: reject };
        this.createJsonpRequest(params);
      }

      this.delete = function (url, config, resolve, reject) {
        if (typeof config === 'function') {
          reject = resolve;
          resolve = config;
        }
        var params = { method: 'delete', url: url, config: config, data: null, resolve: resolve, reject: reject };
        this.createJsonpRequest(params);
      }

      this.post = function (url, data, config, resolve, reject) {
        if (typeof config === 'function') {
          reject = resolve;
          resolve = config;
        }
        var params = { method: 'post', url: url, config: config, data: data, resolve: resolve, reject: reject };
        this.createJsonpRequest(params);
      }

      this.put = function (url, data, config, resolve, reject) {
        if (typeof config === 'function') {
          reject = resolve;
          resolve = config;
        }
        var params = { method: 'put', url: url, config: config, data: data, resolve: resolve, reject: reject };
        this.createJsonpRequest(params);
      }

      this.getQueryString = function (params) {
        var queryStr = '';
        for (var key in params) {
          if (params.hasOwnProperty(key)) {
            queryStr += '&' + key + '=' + params[key];
          }
        }
        return queryStr.length ? '?' + queryStr.replace(/^&/, '') : queryStr;
      }

      this.createJsonpRequest = function (condition) {
        var method = condition.method;
        var url = condition.url;
        var config = condition.config;
        var data = condition.data;
        var resolve = condition.resolve;
        var reject = condition.reject;

        var params = { url: url, path: url };
        for (var key in config) {
          if (config.hasOwnProperty(key)) {
            params[key] = config[key];
          }
        }
        var jsonpConfig = jsonp.requestSuccessCallback(params);
        var opts = {
          timeout: jsonpConfig.timeout
        };

        var jsonpURL = this.buildUrl(method, jsonpConfig, data);
        jsonp(jsonpURL, opts, function (err, result) {
          this.handleJsonpResult(err, result, jsonpConfig, resolve, reject)
        });
      }

      this.buildUrl = function (method, config, data) {
        var condition = {
          method: method,
          path: encodeURIComponent(config.path),
        };

        condition.params = config.params ? config.params : {};

        if (data) {
          condition.data = encodeURIComponent(JSON.stringify(data));
        }

        var queryStr = this.getQueryString(condition);
        return API_ENDPOINT + API_JSONPPROXY + queryStr;
      }

      this.handleJsonpResult = function (err, data, config, resolve, reject) {
        if (err) {
          return reject(this.responseFailCallback({ response: { status: TIMEOUT, data: err }, config: config }));
        }

        if (data.status === OK) {
          var response = { data: data.data, config: config };
          return resolve(this.responseSuccessCallback(response));
        }

        var error = { response: { status: data.status, data: data.data }, config: config };
        return reject(this.responseFailCallback(error));
      }
    }

    var jsonp = new Jsonp();
  }

  rest = {
    get: get
  };

  w.rest = rest;
})(window)