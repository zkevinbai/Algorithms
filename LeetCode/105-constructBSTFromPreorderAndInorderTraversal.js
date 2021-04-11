/*
105. Construct Binary Tree from Preorder and Inorder Traversal
Medium

Given two integer arrays preorder and inorder where preorder is the preorder 
traversal of a binary tree and inorder is the inorder traversal of the same tree, 
construct and return the binary tree.

Example 1:
Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]
Example 2:

Input: preorder = [-1], inorder = [-1]
Output: [-1]


Constraints:

1 <= preorder.length <= 3000
inorder.length == preorder.length
-3000 <= preorder[i], inorder[i] <= 3000
preorder and inorder consist of unique values.
Each value of inorder also appears in preorder.
preorder is guaranteed to be the preorder traversal of the tree.
inorder is guaranteed to be the inorder traversal of the tree.
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
// var buildTree = function(preorder, inorder) {

// };

class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class OrderedTree {
    constructor() {
        this.root = null;
        this.locOrder = null;
    }
    insert(value, root = this.root) {
        const node = new TreeNode(value)
        if (!this.root) {
            this.root = node
        } else if (this.locOrder.indexOf(root.val) > this.locOrder.indexOf(value)) {
            if (!root.left) {
                root.left = node;
            } else {
                this.insert(value, root.left)
            }
        } else {
            if (!root.right) {
                root.right = node;
            } else {
                this.insert(value, root.right)
            }
        }
    }
}

function buildTree(loadOrder, locOrder) {
    const tree = new OrderedTree();
    tree.locOrder = locOrder;

    loadOrder.forEach(value => {
        tree.insert(value)
    });

    return tree;
}