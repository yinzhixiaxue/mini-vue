class Reactiveffect {
  private _fn;
  constructor(fn) {
    this._fn = fn
  }
  run() {
    activeEffect = this
    this._fn()
  }
}

let targetMap = new Map()
let activeEffect;
export function track(target, key) {
  // target => dep => key
  // 把target都当成key存到map里面，值是depsMap，然后再把dep当成key存进map，值是实例对象
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }
  dep.add(activeEffect)
}

export function trigger(target, key) {
  let depsMap = targetMap.get(target)
  let deps = depsMap.get(key)
  // 把当前实例的所有需要触发的方法，全都执行一遍
  for (let item of deps) {
    item.run()
  }
}
export function effect(fn) {
  const _effect = new Reactiveffect(fn)
  _effect.run()
  return _effect
}