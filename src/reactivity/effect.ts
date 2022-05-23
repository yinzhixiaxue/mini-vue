
class ReactiveEffect {
  private _fn
  constructor(fn) {
    this._fn = fn
  }
  run() {
    activeEffect = this;
    this._fn()
  }
}

let activeEffect;
let targetMap = new Map()
export function track(target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let deps = depsMap.get(key)
  if (!deps) {
    deps = new Set()
    depsMap.set(key, deps)
  }
  // 此处需要把后面触发trigger的实例存起来
  deps.add(activeEffect)
}

export function trigger(target, key) {
  let depsMap = targetMap.get(target)
  let deps = depsMap.get(key)
  console.log('deps => ', deps)
  // 此处为什么要用for of呢
  for (let item of deps) {
    item.run()
  }
}

// 让默认的方法执行起来
export function effect(fn) {
  let _effect = new ReactiveEffect(fn)
  _effect.run()
}