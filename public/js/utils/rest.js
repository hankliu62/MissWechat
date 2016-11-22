(function (w) {
  var rest = {};

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

  rest = {
    get: get
  };

  w.rest = rest;
})(window)