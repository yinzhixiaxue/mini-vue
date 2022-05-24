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

  it("scheduler", () => {
    // 1.通过 effect 的第二个参数，给定的一个 scheduler 的fn
    // 2.effect第一次执行的时候还会执行fn
    // 3.当响应式对象 set update的时候，不会执行fn，而是会执行scheduler
    // 4.如果当执行 runner 的时候，还会执行 fn
    let run: any
    let dummy;
    const scheduler = jest.fn(() => {
      run = runner
    })
    const obj = reactive({ foo: 1 })
    const runner = effect(() => {
      dummy = obj.foo
    }, { scheduler })
    expect(scheduler).not.toHaveBeenCalled()
    expect(dummy).toBe(1)
    obj.foo++
    expect(scheduler).toHaveBeenCalledTimes(1)
    // should not run yet
    expect(dummy).toBe(1);
    // manually run
    run()
    // should have run
    expect(dummy).toBe(2);
    // should be called on first trigger
    // let dummy;
    // let run: any;
    // const scheduler = jest.fn(() => {
    //   run = runner;
    // });
    // const obj = reactive({ foo: 1 });
    // const runner = effect(
    //   () => {
    //     dummy = obj.foo;
    //   },
    //   { scheduler }
    // );
    // expect(scheduler).not.toHaveBeenCalled();
    // expect(dummy).toBe(1);
    // // should be called on first trigger
    // obj.foo++;
    // expect(scheduler).toHaveBeenCalledTimes(1);
    // // // should not run yet
    // expect(dummy).toBe(1);
    // // // manually run
    // run();
    // // // should have run
    // expect(dummy).toBe(2);
  });
})