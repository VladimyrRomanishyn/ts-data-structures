import { Stack } from '../src';

const stack: Stack<number> = new Stack<number>();

beforeEach(() => {
    stack.clear();
    stack.push(1);
});
describe('Stack tests suite', () => {
    test('Checks stack empty method', () => {
        expect(stack.empty()).toBeFalsy();
    });

    test('Checks stack push & peek methods', () => {
        expect(stack.peek()).toBe(1);
    });
    test('Checks stack pop method', () => {
        expect(stack.pop()).toBe(1);
    });

    test('Checks stack search method', () => {
        expect(stack.search(1)).toBe(0);
    });
});
