class ArrayUtil {
  static chunk (array, n) {
    const temp = []
    for (let i = 0, length = ~~array.length / n; temp.length < length; temp[i++] = array.splice(0, n)) {
    }
    array.length && temp.push(array)
    return temp
  }

  static isArray (obj) {
    return Object.prototype.toString.call(obj).slice(8, -1) === 'Array'
  }

  static find (array, value, key) {
    if (!ArrayUtil.isArray(array) || array.length === 0) {
      return [null, -1]
    }

    for (const [index, item] of array.entries()) {
      if (key) {
        if (item[key] === value) {
          return [item, index]
        }
      } else {
        if (item === value) {
          return [item, index]
        }
      }
    }

    return [null, -1]
  }
}

export default ArrayUtil
