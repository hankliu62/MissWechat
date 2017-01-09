class ElementUtil {
  static getBodySize () {
    if (document.compatMode === 'BackCompat') {
      const body = document.body;
      return {
        width: Math.max(body.clientWidth, body.scrollWidth),
        height: Math.max(body.clientHeight, body.scrollHeight)
      }
    }

    const documentElement = document.documentElement
    return {
      width: Math.max(documentElement.clientWidth, documentElement.scrollWidth),
      height: Math.max(documentElement.clientHeight, documentElement.scrollHeight)
    }
  }

  // 获得元素的尺寸
  static getElementSize (element) {
    return {
      width: Math.max(element.clientWidth, element.scrollWidth),
      height: Math.max(element.clientHeight, element.scrollHeight)
    }
  }

  // 获取绝对位置的横坐标和纵坐标
  static getElementAbsolutePosition (element) {
    let left = element.offsetLeft
    let top = element.offsetTop
    let current = element.offsetParent

    while (current) {
      left += current.offsetLeft
      top += current.offsetTop

      current = current.offsetParent
    }

    return { left, top }
  }

  // 获取相对位置的横坐标和纵坐标
  static getElementRelativePosition (element) {
    const position = ElementUtil.getElementAbsolutePosition(element)

    let elementScrollLeft = 0
    let elementScrollTop = 0
    if (document.compatMode === 'BackCompat') {
      const body = document.body
      elementScrollLeft = body.scrollLeft
      elementScrollTop = body.scrollTop
    } else {
      const documentElement = document.documentElement
      elementScrollLeft = documentElement.scrollLeft
      elementScrollTop = documentElement.scrollTop
    }

    return {
      left: position.left - elementScrollLeft,
      top: position.top - elementScrollTop
    }
  }

  static setElementStyle (element, styleObject = {}) {
    for (const key in styleObject) {
      if (styleObject.hasOwnProperty(key)) {
        element.style[key] = styleObject[key]
      }
    }
  }

  static getElementStyle (element, styleKey) {
    if (element[styleKey]) {
      return element.style[styleKey]
    }

    if (element.currentStyle) {
      return element.currentStyle[styleKey]
    }

    if (document.defaultView && document.defaultView.getComputedStyle) {
      styleKey = styleKey.replace(/([A-Z])/g, '-$1').toLowerCase()
      return document.defaultView.getComputedStyle(element, null).getPropertyValue(styleKey)
    }

    return null
  }
}

export default ElementUtil
