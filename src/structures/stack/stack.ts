/**
 * Stack LIFO type data structure based on array.
 *
 * ```ts
 * //Usage
 *
 * const stack = new Stack<number>();
 *
 * stack.push(1);
 * stack.push(5);
 * stack.empty();   // false
 * stack.search(1); // 0
 * stack.search(9); // -1
 * stack.peek();    // 5
 * stack.pop();     // 5
 * ```
 */
export class Stack<T> {
    /**
     * The constructor of `Stack` class.
     * @param stack Optional paramenter for initialization stack already with elements.
     */
    constructor(private stack: T[] = []) {}
    /**
     * Public method to place the new element to the stack.
     * @param element will be placed to the top of the stack.
     */
    public push(element: T): void {
        this.stack.push(element);
    }
    /**
     * Public method to remove element from the top of the stack.
     * @returns element from the top of the stack.
     */
    public pop(): T {
        return this.stack.pop();
    }
    /**
     * Public method for checking emptiness of the stack.
     * @returns indicates whether the stack is empty or not.
     */
    public empty(): boolean {
        return !this.stack.length;
    }
    /**
     * Public method takes the first element of the stack, but not removes it.
     * @returns the element from the top of the stack.
     */
    public peek(): T | undefined {
        return this.stack.at(-1);
    }
    /**
     * Public method for searching element in the array.
     * @param element searched element or comparing function.
     * @returns index of element or -1 if the element doesn't exits.
     */
    public search(
        element: T | ((value: T, index?: number, obj?: T[]) => unknown),
    ): number {
        if (typeof element === 'function') {
            return this.stack.findIndex(
                element as (value: T, index?: number, obj?: T[]) => unknown,
            );
        }
        return this.stack.findIndex((e) => e === element);
    }
    /**
     * Public method clears the stack;
     */
    public clear(): void {
        this.stack = [];
    }
}
