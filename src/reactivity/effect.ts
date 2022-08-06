const _fn = Symbol('_fn');
class ReactiveEffect {
  private _fn: any
  constructor(fn) {
    this[_fn] = fn
  }
  run() {
    activeEffect = this
    return this[_fn]()
  }
}

let activeEffect
export function effect(fn) {
  let effect = new ReactiveEffect(fn)
  effect.run()
  return effect.run.bind(effect)
  // let runner = effect.run()
  // runner()
  // return effect.run.bind(effect)
  // return effect.run()
}

// target -> key -> dep
let targetMap = new Map()
export function track(target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    // 别忘了set。。。
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }
  // 此处要加的是实例，而不是fn
  dep.add(activeEffect)
}

export function trigger(target, key) {
  let depsMap = targetMap.get(target)
  let dep = depsMap.get(key)
  for (let effect of dep) {
    effect.run()
  }
}