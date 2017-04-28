import ObjectID from 'bson-objectid'

export function find (list, f) {
  return list.filter(f)[0]
}

export function isArray (arr) {
  return Object.prototype.toString.call(arr).slice(8, -1) === 'Array'
}

export function isObject (object) {
  return Object.prototype.toString.call(object).slice(8, -1) === 'Object'
}

export function isString (str) {
  return Object.prototype.toString.call(str).slice(8, -1) === 'String'
}

export function cloneDeep (obj, cache = []) {
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

export function generateObjectId (param) {
  if (param) {
    return ObjectID(param).toString()
  }

  return ObjectID().toString()
}
