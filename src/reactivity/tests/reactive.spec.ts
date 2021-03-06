import { reactive } from '../reactive'
describe('reactive', () => {
    it('happypath', () => {
        const obj = { foo: 1 };
        const observed = reactive(obj)
        expect(observed.value).not.toBe(obj)
        expect(observed.foo).toBe(1)
    })
})