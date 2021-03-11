/**
Given the root of a binary tree, return the inorder traversal of its nodes' values.

Example 1:


Input: root = [1,null,2,3]
Output: [1,3,2]
Example 2:

Input: root = []
Output: []
Example 3:

Input: root = [1]
Output: [1]
Example 4:


Input: root = [1,2]
Output: [2,1]
Example 5:


Input: root = [1,null,2]
Output: [1,2]


Constraints:

The number of nodes in the tree is in the range [0, 100].
-100 <= Node.val <= 100


Follow up:

Recursive solution is trivial, could you do it iteratively?
**/

// recursive

const inOrderRecurisive = (root) => {

    const res = [];

    const visit = (node) => {
        if (node && node.val) res.push(node.val);
    }

    const recuseInOrder = (root) => {
        if (root.left) inOrderRecurisive(root.left);
        visit(root)
        if (root.right) inOrderRecurisive(root.right);
    }

    return res;
}


// iterative
    // Time Complexity: O(n)
    // Space Complexity: O(n)

const inOrderIterative = (root) => {
    if (!root) return [];

    const stack = [root];
    const result = [];

    while (stack.length) {
        let current = stack[stack.length - 1];

        if (current.left) {
            stack.push(current.left);
            current.left = null;
        } else {
            result.push(stack.pop().val);
            if (current.right) stack.push(current.right);
        }
    }

    return result;
}

var inorderTraversal = function (root) {
    return inOrderIterative(root);
};