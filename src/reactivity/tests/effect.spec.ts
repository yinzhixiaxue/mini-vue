import { reactive } from '../reactive'
import { effect } from '../effect'
describe('effect', () => {
  it('happypath', () => {
    let b;
    // 初始化的时候只是返回一个proxy对象，不会走get或者set的逻辑
    const obj = reactive({ foo: 1 })
    effect(() => {
      b = obj.foo + 1;
    })
    console.log(`b => ${b}`)
    expect(b).toBe(2)
    obj.foo++;
    expect(b).toBe(3)

  })
})