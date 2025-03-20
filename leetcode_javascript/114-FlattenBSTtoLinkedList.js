/*
114. Flatten Binary Tree to Linked List
Given the root of a binary tree, flatten the tree into a "linked list":

The "linked list" should use the same TreeNode class where the right child pointer points to the next node in the list and the left child pointer is always null.
The "linked list" should be in the same order as a pre-order traversal of the binary tree.


Example 1:


Input: root = [1,2,5,3,4,null,6]
Output: [1,null,2,null,3,null,4,null,5,null,6]
Example 2:

Input: root = []
Output: []
Example 3:

Input: root = [0]
Output: [0]


Constraints:

The number of nodes in the tree is in the range [0, 2000].
-100 <= Node.val <= 100


Follow up: Can you flatten the tree in-place (with O(1) extra space)?
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */

const TreeNode = (val = 0, left = undefined, right = undefined) => {
    return (
        {
            val,
            left,
            right
        }
    );
}

const flatten = (root) => {
    if (!root) return root;
    const newTree = TreeNode(root.val, null, null);

    let newTreeRef = newTree;
    let isFirstNode = true

    const preOrder = (node) => {
        if (isFirstNode) {
            isFirstNode = false;
        } else {
            const newNode = TreeNode(node.val, null, null);;
            newTreeRef.right = newNode;
            newTreeRef = newNode;
        }
        node.left && preOrder(node.left);
        node.right && preOrder(node.right);
    };

    preOrder(root);
    // console.log(JSON.stringify(newTree, null, 2))

    root.left = null;
    root.right = newTree.right;
};


/*
    unecessary flattening module

    newTreeRef = newTree;
        let rootRef = root;
        while (newTreeRef.right) {
            rootRef.val = newTreeRef.val;
            rootRef.left = null;
            rootRef.right = newTreeRef.right;

            newTreeRef = newTreeRef.right;
            rootRef = rootRef.right;
        }
*/