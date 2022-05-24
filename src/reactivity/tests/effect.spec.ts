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

  it('runner', () => {
    // 当调用 runner 的时候可以重新执行 effect.run
    // runner 的返回值就是用户给的 fn 的返回值
    let foo = 10;
    const runner = effect(() => {
      foo++;
      return 'foo'
    })
    expect(foo).toBe(11)
    const b = runner()
    expect(foo).toBe(12)
    expect(b).toBe('foo')
  })
})