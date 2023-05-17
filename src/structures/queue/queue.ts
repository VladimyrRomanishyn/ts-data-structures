import { LinkedList, ListItem } from '../linked-lists/linked-list';
/**
 * Queue FIFO type data structure based on linked list.
 *
 * ```ts
 * //Usage
 *
 * const queue = new Queue<number>();
 *
 * queue.add(1);
 * queue.add(3);
 * queue.add(5);
 * queue.add(4);
 * queue.printQueue();     // 1 --> 3 --> 5 --> 4
 * queue.remove();         // 1
 * queue.remove();         // 3
 * queue.printQueue();     // 5 --> 4
 * ```
 */
export class Queue<T> {
    /**
     * Private property used as data storage.
     */
    private queue = new LinkedList<T>();
    /**
     * constructor of the `Queue` class.
     * @param element optional element for initialization.
     */
    constructor(element?: T) {
        if (element) {
            this.queue.addFirst(new ListItem<T>(element));
        }
    }
    /**
     * Public method to add the new element to the queue.
     * @param element
     */
    public add(element: T): void {
        this.queue.addLast(new ListItem<T>(element));
    }
    /**
     * Public method to remove the element from the queue.
     * @returns removed element.
     */
    public remove(): T {
        const item = this.queue.removeFirst();
        return item;
    }
    /**
     * Public method to check if the element already in the queue.
     * @param element searched element.
     * @returns searched element or boolean.
     */
    public contains(element: T): boolean {
        const result = this.queue.contains(element);
        return result;
    }
    /**
     * Public method print in the console queue sequence.
     */
    public printQueue(): void {
        this.queue.printList();
    }
    /**
     * Public method clears the queue.
     */
    public clear(): void {
        this.queue.clearList();
    }
    /**
     * Public method check emptiness of the queue.
     */
    public empty(): boolean {
        return this.queue.empty();
    }
}
