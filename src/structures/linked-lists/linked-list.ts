/**
 * Abstract class the base for Linked list storage item.
 */
export abstract class ListNode<T> {
    /**
     * Public property containes the reference for the next item of the list.
     */
    public next: ListNode<T> = null;
    /**
     * Public property holds the data of the list item.
     */
    public data: T;
    /**
     * ListNode class constructor.
     * @param params the data of the class or  the class for cloning purpouses.
     */
    constructor(params: ListNode<T> | T) {
        if (params instanceof ListNode) {
            this.data = params.data;
            this.next = params.next;
        } else {
            this.data = params;
        }
    }
}
/**
 * Class with minimal requierments for Linked List item.
 */
export class ListItem<T> extends ListNode<T> {}
/**
 * Linked list data structure.
 *
 * ```ts
 * //Usage
 *
 * const list = new LinkedList<number>();
 *
 * list.insert(new ListItem<number>(1));
 * list.insert(new ListItem<number>(2));
 * list.insert(new ListItem<number>(3));
 * list.insert(new ListItem<number>(4));
 * list.printList();   //1 --> 2 --> 3 --> 4
 * list.addFirst(new ListItem<number>(5));
 * list.printList();   //5 --> 1 --> 2 --> 3 --> 4
 * list.removeFirst(); // ListItem {next: ListItem, data: 5};
 * list.printList();   // 1 --> 2 --> 3 --> 4
 * list.removeLast();  // ListItem {next: null, data: 4};
 * list.printList();   // 1 --> 2 --> 3
 * ```
 */
export class LinkedList<T> {
    /**
     * Private property the callback used for comparing list items while traversing over the list.
     * @param a target node or data to compare with.
     * @param b next node or data to compare with.
     * @returns
     */
    private compareCb = (a: ListNode<T> | T, b: ListNode<T> | T): boolean =>
        JSON.stringify(a) === JSON.stringify(b);
    /**
     * Private property the reference to the top element of the list.
     * */
    private head: ListNode<T>;
    /**
     * Private property the reference to the last element of the list.
     * */
    private tail: ListNode<T>;
    /**
     * Linked list class constructor
     * @param head optional element for initialization.
     */
    constructor(head?: ListNode<T> | T) {
        if (!head) {
            return;
        }
        if (head instanceof ListNode) {
            this.head = head;
        } else {
            this.head = new ListItem(head);
        }

        this.tail = this.head;
    }
    /**
     * Public method for printing the list in the console.
     */
    public printList(): void {
        if (!this.head) {
            console.log('List is empty!');
            return;
        }

        let target = this.head;
        let result = `${this.head.data}`;

        while (target.next) {
            result += ` --> ${target.next.data}`;
            target = target.next;
        }

        console.log(result);
    }
    /**
     * Public method for checking if the element already in the list.
     * @param element searched element.
     * @param comparator optioanal function for comparing elements.
     * @returns searched element or boolean.
     */
    public contains(
        element: ListNode<T> | T,
        comparator?: (a: ListNode<T> | T, b: ListNode<T> | T) => boolean,
    ): boolean {
        if (!this.head) {
            return false;
        }

        let target = this.head;
        const compared = element instanceof ListNode ? element.data : element;
        const result = comparator
            ? comparator(element, target)
            : this.compareCb(compared, target.data);

        while (target) {
            if (result) {
                return true;
            }

            target = target.next;
        }

        return false;
    }
    /**
     * Public method for removing of the given element.
     * @param element element to remove.
     */
    public remove(element: ListNode<T> | T): void {
        if (!this.head) {
            console.warn('[WARNINIG]: ', 'The list is empty!');
            return;
        }

        const compared = element instanceof ListNode ? element.data : element;
        let prev: ListNode<T> | undefined;
        let target = this.head;
        let result = this.compareCb(target.data, compared);

        while (target && !result) {
            prev = target;
            target = target?.next;
            result = this.compareCb(target.data, compared);
        }

        if (prev) {
            prev.next = target.next;
        } else {
            this.head = target.next;
        }

        target.next = null;
    }
    /**
     * Public method to add element in the head of the list.
     * @param element
     */
    public addFirst(element: ListNode<T> | T): void {
        this.insert(element, 0);
    }
    /**
     * Public method for removing the first element of the list.
     * @returns The first element of the list.
     */
    public removeFirst(): T {
        if (!this.head) {
            console.warn('[WARNINIG]: ', 'The list is empty!');
            return;
        }

        const prevHead = this.head;

        if (this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }

        return prevHead.data;
    }
    /**
     * Public method for removing the last element of the list.
     * @returns The last element of the list.
     */
    public removeLast(): T {
        if (!this.head) {
            console.warn('[WARNINIG]: ', 'The list is empty!');
            return;
        }

        if (!this.head.next) {
            const prevTail = this.head;
            this.head = null;
            this.tail = null;

            return prevTail.data;
        }

        let preTail = this.head;
        let target = this.head.next;

        while (target.next) {
            preTail = target;
            target = target.next;
        }

        this.tail = preTail;
        preTail.next = null;

        return target.data;
    }
    /**
     * Public method for adding the element to the end of the list.
     * @param element The element to add.
     */
    public addLast(element: ListNode<T> | T): void {
        element = element instanceof ListNode ? element : new ListItem(element);

        if (!this.head) {
            this.head = element;
            this.tail = element;
            return;
        }
        this.tail.next = element;
        this.tail = element;
    }
    /**
     * Public method for inserting elements to the list.
     * @param element The element to insert.
     * @param index Optional the index order on the element.
     */
    public insert(element: ListNode<T> | T, index?: number): void {
        element = element instanceof ListNode ? element : new ListItem(element);

        if (!this.head) {
            this.head = element;
            this.tail = element;
            return;
        }

        if (isFinite(index)) {
            let prev: ListNode<T> | undefined;
            let target = this.head;
            let prevIndex = 0;

            while (target && prevIndex !== index) {
                prevIndex++;
                prev = target;
                target = target.next;
            }

            if (prev) {
                prev.next = element;
                element.next = target;
            } else {
                this.head = element;
                element.next = target;
            }
        } else {
            this.addLast(element);
        }
    }
    /**
     * Public method to clear the all elements from the list.
     */
    public clearList() {
        this.head = null;
        this.tail = null;
    }
    /**
     * Public method to check the emptiness of the list.
     */
    public empty(): boolean {
        return !this.head;
    }
}
