import { effect } from '../effect'
import { reactive } from '../reactive'
describe('effect', () => {
  it('happypath', () => {
    let obj = reactive({ foo: 1 })
    let b;
    effect(() => {
      b = obj.foo + 1
    })
    expect(b).toBe(2)
    obj.foo++
    expect(b).toBe(3)
  })
})