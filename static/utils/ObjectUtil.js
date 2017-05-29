import ObjectID from 'bson-objectid'

function find (list, f) {
  return list.filter(f)[0]
}

function isArray (arr) {
  return Object.prototype.toString.call(arr).slice(8, -1) === 'Array'
}

function isObject (object) {
  return Object.prototype.toString.call(object).slice(8, -1) === 'Object'
}

function isString (str) {
  return Object.prototype.toString.call(str).slice(8, -1) === 'String'
}

function isNumber (i) {
  return Object.prototype.toString.call(i).slice(8, -1) === 'Number'
}

function isInt (i) {
  return isNumber(i) && ~~i === i
}

function cloneDeep (obj, cache = []) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  const hit = find(cache, (c) => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = isArray(obj) ? [] : {}
  cache.push({
    original: obj,
    copy
  })

  for (const key of Object.keys(obj)) {
    copy[key] = cloneDeep(obj[key], cache)
  }

  return copy
}

function generateObjectId (param) {
  if (param) {
    return ObjectID(param).toString()
  }

  return ObjectID().toString()
}

function set (obj, value, ...keys) {
  if (!keys || keys.length <= 0) {
    return value
  }

  if (!isObject(obj) && !isArray(obj)) {
    obj = {}
  }

  let temp = obj

  const keysLength = keys.length

  const firstChildKey = keys[0]
  if (isInt(firstChildKey) && !obj[firstChildKey]) {
    obj = []
    temp = obj
  }

  for (let i = 0; i < keysLength - 1; i++) {
    const key = keys[i]
    const nextKey = keys[i + 1]

    if (isInt(nextKey)) {
      if (!isArray(temp[key])) {
        temp[key] = []
      }

      temp = temp[key]
    } else {
      if (!isObject(temp[key])) {
        temp[key] = {}
      }

      temp = temp[key]
    }
  }

  const lastChildKey = keys[keysLength - 1]
  if (isInt(lastChildKey)) {
    if (!isArray(temp)) {
      temp = []
    }
  } else {
    if (!isObject(temp)) {
      temp = {}
    }
  }

  temp[lastChildKey] = value

  return obj
}

class ObjectUtil {}

ObjectUtil.find = find
ObjectUtil.isArray = isArray
ObjectUtil.isObject = isObject
ObjectUtil.isString = isString
ObjectUtil.isNumber = isNumber
ObjectUtil.isInt = isInt
ObjectUtil.cloneDeep = cloneDeep
ObjectUtil.generateObjectId = generateObjectId
ObjectUtil.set = set

export default ObjectUtil

