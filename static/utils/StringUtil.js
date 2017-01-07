class StringUtil {
  // static method for UTF-8 encoding
  static utf8Encode (str) {
    str = str.replace(/\r\n/g, '\n');
    let result = '';
    for (let i = 0, length = str.length; i < length; i++) {
      const c = str.charCodeAt(i)
      if (c < 128) {
        result += String.fromCharCode(c)
      } else if ((c > 127) && (c < 2048)) {
        result += String.fromCharCode((c >> 6) | 192)
        result += String.fromCharCode((c & 63) | 128)
      } else {
        result += String.fromCharCode((c >> 12) | 224)
        result += String.fromCharCode(((c >> 6) & 63) | 128)
        result += String.fromCharCode((c & 63) | 128)
      }
    }
    return result
  }

  // static method for UTF-8 decoding
  static utf8Decode (str) {
    let result = ''
    let i = 0
    let c1 = 0
    let c2 = 0
    let c3 = 0
    const length = str.length
    while (i < length) {
      c1 = str.charCodeAt(i)
      if (c1 < 128) {
        result += String.fromCharCode(c1)
        i++
      } else if ((c1 > 191) && (c1 < 224)) {
        c2 = str.charCodeAt(i + 1)
        result += String.fromCharCode(((c1 & 31) << 6) | (c2 & 63))
        i += 2
      } else {
        c2 = str.charCodeAt(i + 1)
        c3 = str.charCodeAt(i + 2)
        result += String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
        i += 3
      }
    }
    return result
  }

  static getBase64Key () {
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  }

  // public method for base64 encoding
  static base64Encode (str) {
    let result = ''
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4
    let i = 0
    str = StringUtil.utf8Encode(str)
    const length = str.length
    const base64Key = StringUtil.getBase64Key()
    while (i < length) {
      chr1 = str.charCodeAt(i++)
      chr2 = str.charCodeAt(i++)
      chr3 = str.charCodeAt(i++)
      enc1 = chr1 >> 2
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
      enc4 = chr3 & 63
      if (isNaN(chr2)) {
        enc3 = enc4 = 64
      } else if (isNaN(chr3)) {
        enc4 = 64
      }
      result = result + base64Key.charAt(enc1) + base64Key.charAt(enc2) +
        base64Key.charAt(enc3) + base64Key.charAt(enc4)
    }
    return result
  }

  // public method for base64 decoding
  static base64Decode (str) {
    let result = ''
    let chr1, chr2, chr3
    let enc1, enc2, enc3, enc4
    let i = 0
    str = str.replace(/[^A-Za-z0-9+/=]/g, '')
    const length = str.length
    const base64Key = StringUtil.getBase64Key()
    while (i < length) {
      enc1 = base64Key.indexOf(str.charAt(i++))
      enc2 = base64Key.indexOf(str.charAt(i++))
      enc3 = base64Key.indexOf(str.charAt(i++))
      enc4 = base64Key.indexOf(str.charAt(i++))
      chr1 = (enc1 << 2) | (enc2 >> 4)
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
      chr3 = ((enc3 & 3) << 6) | enc4
      result = result + String.fromCharCode(chr1)
      if (enc3 !== 64) {
        result = result + String.fromCharCode(chr2)
      }
      if (enc4 !== 64) {
        result = result + String.fromCharCode(chr3)
      }
    }
    result = StringUtil.utf8Decode(result)
    return result
  }
}

export default StringUtil
