import ArrayUtil from './ArrayUtil'

class RegExpUtil {
  static testUrl (src) {
    return RegExpUtil.url.test(src)
  }

  static testRequired (src) {
    return RegExpUtil.required.test(src)
  }

  static testUrlProtocol (src) {
    return RegExpUtil.urlProtocol.test(src)
  }

  static test (types, src) {
    if (ArrayUtil.isArray(types)) {
      for (const type of types) {
        if (RegExpUtil[type] && !RegExpUtil[type].test(src)) {
          return false
        }
      }
      return true
    }

    if (RegExpUtil[types]) {
      return RegExpUtil[types].test(src)
    }

    return true
  }

  static removeHTMLTags (src) {
    return src.replace(RegExpUtil.htmlTag, '')
  }
}

RegExpUtil.url = /^((ftp|http|https):\/\/)*([\w-]+\.)+(\w+)(:[0-9]+)?(\/|([\w#!:.?+=&%@!\-/]+))?$/
RegExpUtil.required = /\S+/
RegExpUtil.urlProtocol = /^(ftp|http|https):\/\//
RegExpUtil.htmlTag = /<[^>]+>/g

export default RegExpUtil
