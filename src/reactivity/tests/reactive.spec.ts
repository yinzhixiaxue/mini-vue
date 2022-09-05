import { reactive, isReactive } from '../reactive'
describe('reactive', () => {
    it('happypath', () => {
        const original = { foo: 1 };
        const observed = reactive(original)
        expect(observed.value).not.toBe(original)
        expect(observed.foo).toBe(1)
        expect(isReactive(observed)).toBe(true);
        expect(isReactive(original)).toBe(false);
    })
})