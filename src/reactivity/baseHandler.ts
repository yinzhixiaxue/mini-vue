import { track, trigger } from "./effect"

const createGetter = function (isReadonly = false) {
  return function get(target, key) {
    console.log('target--------', target)
    console.log('key--------', key)
    if (key === '__v_isReactive') {
      return !isReadonly
    } else if (key === '__v_isReadonly') {
      return isReadonly
    }
    const res = Reflect.get(target, key)
    if (!isReadonly) {
      track(target, key)
    }
    return res
  }
}

const createSetter = function () {
  return function (target, key, value) {
    const res = Reflect.set(target, key, value)
    trigger(target, key)
    return res
  }
}

const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)

export const mutableHandlers = {
  get: get,
  set: set
}

export const readonlyHandlers = {
  get: readonlyGet,
  set: function (target, key) {
    console.warn(`key :"${String(key)}" set 失败，因为 target 是 readonly 类型`, target)
    return true
  }
}