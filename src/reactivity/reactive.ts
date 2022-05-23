import { track, trigger } from './effect'
export function reactive(raw) {
  console.log(`raw => ${JSON.stringify(raw)}`)
  return new Proxy(raw, {
    get: function (target, key) {
      console.log('gettarget => ', target)
      console.log('getkey => ', key)
      track(target, key)
      return Reflect.get(target, key)
    },
    set: function (target, key, value) {
      console.log('settarget => ', target)
      console.log('setkey => ', key)
      console.log('setvalue => ', value)
      target[key] = value
      trigger(target, key)
      return Reflect.set(target, key, target[key])
    }
  })
}
