/*
Given the root of a binary search tree, and an integer k, return the kth (1-indexed) smallest element in the tree.

Example 1:

Input: root = [3,1,4,null,2], k = 1
Output: 1
Example 2:

Input: root = [5,3,6,2,4,null,null,1], k = 3
Output: 3

Constraints:

The number of nodes in the tree is n.
1 <= k <= n <= 104
0 <= Node.val <= 104

Follow up: If the BST is modified often (i.e., we can do insert and delete operations) and you need to find the kth smallest frequently, how would you optimize?
*/

// Solution - traverse BST, covert to array, use indexing to find kth

const inOrderBST = (root) => {
    const nums = [];

    const visit = (node) => {
        nums.push(node.val);
    }

    const recursiveInOrder = (node) => {
        if (node.left) recursiveInOrder(node.left);
        visit(node);
        if (node.right) recursiveInOrder(node.right);
    };

    recursiveInOrder(root);

    return nums;
}

var kthSmallest = function (root, k) {
    const nums = inOrderBST(root);
    return nums[k - 1]
};

