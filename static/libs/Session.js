import QueryStringUtil from '../utils/QueryStringUtil';

class Session {
  static set (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get (key, useQueryString = false) {
    if (useQueryString) {
      const value = QueryStringUtil.get(key);
      if (value) {
        Session.set(key, value);
      }
    }

    return localStorage.getItem(key);
  }

  static remove (key) {
    localStorage.removeItem(key);
  }

  static getQiniu () {
    return JSON.parse(Session.get('qiniu'));
  }
}

export default Session
