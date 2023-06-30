/**
 * Abstract class the base for Tree Item.
 */
export abstract class TreeNode<T, K> {
    /**
     * TreeNode class constructor.
     * @param _data The data of the TreeNode.
     * @param children The children of the TreeNode.
     */
    constructor(private _data?: T, protected children?: K) {}
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
     * Protected method returns default searching callback.
     * @param e The element need to find
     * @returns (s: TreeNode<T>) => boolean
     */
    protected compareCb(s: TreeNode<T, K> | T): (e: TreeNode<T, K>) => boolean {
        s = s instanceof TreeNode ? s.data : s;
        return (e: TreeNode<T, K>) =>
            JSON.stringify(e.data) === JSON.stringify(s);
    }
    /**
     * Public abstract method for adding children to the tree node.
     * @param child The child of type TreeNode<T> | T to be added to the tree node's children.
     */
    public abstract addChild(child: TreeNode<T, K> | T): void;
    /**
     * Public abstract method for removig children from the tree node.
     * @param child The child of type TreeNode<T> | T to be removed to the tree node's children.
     * @returns The child of type TreeNode<T> removed from the node's children.
     */
    public abstract removeChild(
        child: TreeNode<T, K> | T,
        searchCb: (e: TreeNode<T, K> | T) => unknown,
    ): void;
}
/**
 * Class with minimal requirements for TreeItem
 */
export class TreeItem<T, K extends TreeItem<T, K>[]> extends TreeNode<T, K> {
    /**
     * Public  method for adding children to the tree item.
     * @param child The child of type TreeNode<T> | T to be added to the tree items's children.
     */
    public addChild(child: TreeNode<T, K> | T): void {
        child = child instanceof TreeNode ? child : new TreeItem(child);
        this.children.push(child);
    }

    public removeChild(
        child: T | TreeNode<T, K>,
        searchCb: (e: T | TreeNode<T, K>) => boolean = this.compareCb(child),
    ): void {
        const index = this.children.findIndex(searchCb);

        if (index < 0) {
            console.error('The element is not child of the node!');
            return;
        }

        this.children.splice(index, 1);
    }
}
