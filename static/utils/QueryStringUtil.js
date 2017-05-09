class QueryStringUtil {
  static get (key) {
    // location.search doesn't work on hybrid environment
    const searchStr = location.href.split('?')[1] || '';
    const paramPairs = searchStr.split('&');
    for (const pair of paramPairs) {
      const firstIndex = pair.indexOf('=');
      const urlKey = pair.substring(0, firstIndex);

      if (urlKey === key) {
        return pair.substring(firstIndex + 1, pair.length);
      }
    }

    return null;
  }

  static stringify (obj, encode = false) {
    let query = '?'
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = encode ? encodeURIComponent(obj[key]) : obj[key]
        query += `${key}=${value}&`
      }
    }
    return query.slice(0, -1)
  }
}

export default QueryStringUtil;
