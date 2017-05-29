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

  // 设置元素的样式
  static setElementStyle (element, styleObject = {}) {
    for (const key in styleObject) {
      if (styleObject.hasOwnProperty(key)) {
        element.style[key] = styleObject[key]
      }
    }
  }

  // 获得元素的某个样式
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

  // 判断parent包含child
  static isChildOf (child, parent) {
    if (child.parentNode === parent) {
      return true;
    }

    if (child.parentNode === null) {
      return false;
    }

    return ElementUtil.isChildOf(child.parentNode, parent);
  }

  static addClassName (elemnet, name) {
    const className = elemnet.className;
    if (className.indexOf(name) === -1) {
      elemnet.className = `${className} ${name}`
    }
  }

  static removeClassName (elemnet, name) {
    const className = elemnet.className;
    if (className.indexOf(name) !== -1) {
      const reg = new RegExp(name, 'g')
      elemnet.className = className.replace(reg, '').replace(/(^\s*)|(\s*$)/g, '')
    }
  }

  static changeModalVisibilityChenckBodyOverflow (element, isVisibility = true) {
    const body = document.getElementsByClassName('html-body')
    if (body && body.length) {
      if (isVisibility) {
        ElementUtil.addClassName(body[0], 'overflow-hidden')
      } else {
        const modals = [...(document.getElementsByClassName('el-dialog__wrapper') || []), ...(document.getElementsByClassName('hk-preview') || [])]
        const hasOpenModal = modals.some(function (item) {
          return element === item ? false : ElementUtil.getElementStyle(item, 'display') !== 'none'
        })
        if (!hasOpenModal) {
          ElementUtil.removeClassName(body[0], 'overflow-hidden')
        }
      }
    }
  }
}

export default ElementUtil
