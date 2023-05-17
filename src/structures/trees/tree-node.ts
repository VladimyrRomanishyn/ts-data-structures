/**
 * TreeNode class used by trees data structures.
 */
export class TreeNode<T> {
    /**
     * TreeNode class constructor.
     * @param _data The data of the TreeNode.
     * @param children The children of the TreeNode.
     */
    constructor(private _data?: T, private children: TreeNode<T>[] = []) {}
    /**
     * The getter function for the private _data property.
     */
    get data(): T {
        return this._data;
    }
    /**
     * The setter for the data property
     * @param value The value of type T for the private _data property.
     */
    set data(value: T) {
        this._data = value;
    }
    /**
     * Private method returns default searching callback.
     * @param e The element need to find
     * @returns (s: TreeNode<T>) => boolean
     */
    private compareCb(e: TreeNode<T> | T): (s: TreeNode<T>) => boolean {
        e = e instanceof TreeNode ? e.data : e;
        return (s: TreeNode<T>) => (JSON.stringify(s.data) === JSON.stringify(e));
    }
    /**
     * Public method for adding children to the tree node.
     * @param child The child of type TreeNode<T> | T to be added to the tree node's children.
     */
    public addChild(child: TreeNode<T> | T): void {
        child = child instanceof TreeNode ? child : new TreeNode(child);
        this.children.push(child);
    }
    /**
     * Public method for removig children from the tree node.
     * @param child The child of type TreeNode<T> | T to be removed to the tree node's children.
     * @returns The child of type TreeNode<T> removed from the node's children.
     */
    public removeChild(child: TreeNode<T> | T, searchCb = this.compareCb): void {
        const index = this.children.findIndex(searchCb(child));

        if (index < 0) {
            console.error('The element is not child of the node!');
            return;
        }

        this.children.splice(index, 1);
    }
}
