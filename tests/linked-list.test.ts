import { LinkedList, ListItem } from '../src';

const list: LinkedList<number> = new LinkedList<number>();
const spy: jest.SpyInstance = jest.spyOn(console, 'log');

afterEach(() => {
    list.clearList();
});

describe('Linked list test suite', () => {
    test('Check for print list method', () => {
        list.insert(new ListItem(1));
        list.insert(new ListItem(2));
        list.insert(new ListItem(3));
        list.insert(new ListItem(4));
        list.printList();
        expect(spy).toHaveBeenCalledWith('1 --> 2 --> 3 --> 4');
    });
    test('Check for contains method', () => {
        const item = new ListItem(1);
        expect(list.contains(item)).toBeFalsy();

        list.insert(item);
        expect(list.contains(item)).toBe(true);
    });

    test('Check for remove method', () => {
        const item = new ListItem(1);
        list.insert(item);
        list.remove(item);
        list.printList();
        expect(spy).toHaveBeenCalledWith('List is empty!');
    });

    test('Check for add first method', () => {
        list.insert(new ListItem(1));
        list.insert(new ListItem(2));
        list.insert(new ListItem(3));
        list.addFirst(new ListItem(4));
        list.printList();
        expect(spy).toHaveBeenCalledWith('4 --> 1 --> 2 --> 3');
    });
    test('Check for remove first method', () => {
        const item = new ListItem(4);
        list.insert(new ListItem(1));
        list.insert(new ListItem(2));
        list.insert(new ListItem(3));
        list.addFirst(item);
        expect(list.removeFirst()).toBe(item.data);

        list.printList();
        expect(spy).toHaveBeenCalledWith('1 --> 2 --> 3');
    });
    test('Check for remove last method', () => {
        const item = new ListItem(4);
        list.insert(new ListItem(1));
        list.insert(new ListItem(2));
        list.insert(new ListItem(3));
        list.insert(item);
        expect(list.removeLast()).toBe(item.data);
        list.printList();
        expect(spy).toHaveBeenCalledWith('1 --> 2 --> 3');
    });
    test('Check for add last method', () => {
        list.insert(new ListItem(1));
        list.insert(new ListItem(2));
        list.insert(new ListItem(3));
        list.addLast(new ListItem(4));
        list.printList();
        expect(spy).toHaveBeenCalledWith('1 --> 2 --> 3 --> 4');
    });

    test('Check for insert', () => {
        list.insert(new ListItem(1));
        list.insert(new ListItem(2));
        list.insert(new ListItem(3));
        list.printList();
        expect(spy).toHaveBeenCalledWith('1 --> 2 --> 3');

        list.insert(new ListItem(4), 1);
        list.printList();
        expect(spy).toHaveBeenCalledWith('1 --> 4 --> 2 --> 3');

        list.insert(new ListItem(10), 0);
        list.printList();
        expect(spy).toHaveBeenCalledWith('10 --> 1 --> 4 --> 2 --> 3');
    });

    test('Check for сlear list method', () => {
        list.insert(new ListItem(1));
        list.insert(new ListItem(2));
        list.insert(new ListItem(3));
        list.printList();
        expect(spy).toHaveBeenCalledWith('List is empty!');
    });
});
