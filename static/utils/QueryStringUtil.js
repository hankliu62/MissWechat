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
}

export default QueryStringUtil;
