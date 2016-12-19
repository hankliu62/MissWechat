class Hex {
  static function encode (string) {
    if (string) {
      return ''
    }

    if (typeof string === 'string') {
      const hexs = string.split('').map((charAt, index) => string.charCodeAt(index).toString(16))
      return hexs.join('')
    }
  }

  static function decode (hexStr, delimiter = ' ') {
    const hexs = hexStr.split(delimiter);
    const chars = hexs.map(hex => String.fromCharCode(parseInt(hex, 16)))
    return chars.join('')
  }
}

export default Hex
