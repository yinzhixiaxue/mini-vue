import {
  track, trigger
} from './effect'
export function reactive(raw) {
  return new Proxy(raw, {
    get: function (target, key) {
      const res = Reflect.get(target, key)
      track(target, key)
      return res
      // return Reflect.get(target, key)
    },
    set: function (target, key, value) {
      const res = Reflect.set(target, key, value)
      trigger(target, key)
      return res
      // return Reflect.set(target, key, value)
    }
  })
}