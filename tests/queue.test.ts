import { Queue } from '../src';

const queue: Queue<number> = new Queue<number>();

beforeEach(() => {
    queue.clear();
});
describe('Queue tests suite', () => {
    test('Checks queue add method', () => {
        const spy = jest.spyOn(queue, 'add');
        queue.add(1);
        expect(spy).toBeCalledWith(1);
    });

    test('Checks queue remove method', () => {
        queue.add(1);
        expect(queue.remove()).toBe(1);
    });

    test('Checks queue contains method', () => {
        queue.add(1);
        expect(queue.contains(1)).toBe(1);
    });

    test('Checks queue print method', () => {
        queue.add(1);
        queue.add(4);
        queue.add(10);
        const spy = jest.spyOn(console, 'log');
        queue.printQueue();
        expect(spy).toHaveBeenCalledWith('1 --> 4 --> 10');
    });
});
