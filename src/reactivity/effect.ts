// const _fn = Symbol('_fn');
import { extend } from '../shared'
class ReactiveEffect {
  private _fn: any
  deps = []
  active = true
  constructor(fn, public scheduler?) {
    // this[_fn] = fn
    this._fn = fn
  }
  run() {
    activeEffect = this
    // return this[_fn]()
    return this._fn()
  }
  stop() {
    if (this.active) {
      cleanEffect(this)
      if (this.onStop) {
        this.onStop()
      }
      this.active = false
    }
  }
  onStop() { }
}

function cleanEffect(effect) {
  effect.deps.forEach((dep: any) => {
    dep.delete(effect)
  })
}
let activeEffect
export function effect(fn, options?) {
  const scheduler = options?.scheduler
  let effect = new ReactiveEffect(fn, scheduler)
  extend(effect, options)
  effect.run()
  const runner: any = effect.run.bind(effect)
  runner.effect = effect
  return runner
  // let runner = effect.run()
  // runner()
  // return effect.run.bind(effect)
  // return effect.run()
}

// target -> key -> dep
// target: { age: 10 }
// targetMap { { age: 10 }: depsMap }
// key: age
// depsMap { age: dep }
// dep: new Set(),dep里面是一个个effect实例
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
  if (!activeEffect) return

  // 此处要加的是实例，而不是fn
  dep.add(activeEffect)
  // 把每个存储effect实例的set存储起来，等stop的时候，可以操作删除
  activeEffect.deps.push(dep)
}

export function trigger(target, key) {
  let depsMap = targetMap.get(target)
  let dep = depsMap.get(key)
  for (let effect of dep) {
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  }
}

export function stop(runner) {
  runner.effect.stop()
}