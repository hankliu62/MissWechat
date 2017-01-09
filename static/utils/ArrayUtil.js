class ArrayUtil {
  static chunk (array, n) {
    const temp = []
    for (let i = 0, length = ~~array.length / n; temp.length < length; temp[i++] = array.splice(0, n)) {
    }
    array.length && temp.push(array)
    return temp
  }
}

export default ArrayUtil
