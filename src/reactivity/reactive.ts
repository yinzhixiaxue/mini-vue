import { mutableHandlers, readonlyHandlers } from './baseHandler'
export function createReactiveObject(target, baseHandlers) {
  return new Proxy(target, baseHandlers)
}

export function reactive(raw) {
  return createReactiveObject(raw, mutableHandlers)
}

export function readonly(raw) {
  return createReactiveObject(raw, readonlyHandlers)
}

export function isReactive(value) {
  return !!value["__v_isReactive"]
}

export function isReadonly(value) {
  return value["__v_isReadonly"]
}