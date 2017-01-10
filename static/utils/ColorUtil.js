class ColorUtil {
  static getHexReg () {
    return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/
  }

  static getRBGReg () {
    return /^(rgb|RGB)/
  }

  static toHex (str) {
    if (ColorUtil.getRBGReg().test(str)) {
      const colors = str.replace(/(\(|rgb|RGB|\))*/g, '').split(',')
      let hexStr = '#'
      for (const item of colors) {
        const hex = Number(item).toString(16)
        hexStr += hex.length === 1 ? `0${hex}` : hex
      }

      if (hexStr.length !== 7) {
        hexStr = str
      }
      return hexStr
    }

    if (ColorUtil.getHexReg().test(str)) {
      var colorChars = str.replace(/#/, '').split('');
      if (colorChars.length === 6) {
        return str
      }

      if (colorChars.length === 3) {
        let hexStr = '#'
        for (const char of colorChars) {
          hexStr += `${char}${char}`
        }

        return hexStr
      }
    }

    return str
  }

  static toRGB (str) {
    let colorStr = str.toLowerCase()
    if (colorStr && ColorUtil.getHexReg().test(colorStr)) {
      if (colorStr.length === 4) {
        let newColorStr = '#'
        for (let i = 1; i < 4; i += 1) {
          const colorChar = colorStr.slice(i, i + 1)
          newColorStr += `${colorChar}${colorChar}`
        }
        colorStr = newColorStr
      }
      // 处理六位的颜色值
      const colorChars = [];
      for (let i = 1; i < 7; i += 2) {
        colorChars.push(parseInt(`0x${colorStr.slice(i, i + 2)}`))
      }
      return `RGB(${colorChars.join(',')})`
    }

    return str
  }

  static isHexColor (str) {
    return ColorUtil.getHexReg().test(str)
  }
}

export default ColorUtil
