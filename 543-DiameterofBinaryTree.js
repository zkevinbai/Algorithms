/*
Given a binary tree, you need to compute the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

Example:
Given a binary tree
          1
         / \
        2   3
       / \
      4   5
Return 3, which is the length of the path [4,2,1,3] or [5,2,1,3].

Note: The length of path between two nodes is represented by the number of edges between them.

strategy
    add max of left and right
*/

// returns max depth

const diameterOfBinaryTree = (root) => {
    let max = 0;

    const maxDepth = (root) => {
        if (!root) return 0;

        const left = maxDepth(root.left);
        const right = maxDepth(root.right);

        max = Math.max(max, left + right);

        return Math.max(left, right) + 1;
    };

    maxDepth(root);

    return max;
};

function maxDepth(root) {
    if (!root) return 0;
    if (!root.left && !root.right) return 1;

    let leftTraversal = 0;
    let rightTraversal = 0;

    if (root.left) leftTraversal += maxDepth(root.left);
    if (root.right) rightTraversal += maxDepth(root.right);

    if (leftTraversal > rightTraversal) return leftTraversal + 1;
    return rightTraversal + 1;
};

const diameterOfBinaryTree = (root) => {
    if (!root) {
        return 0
    }
    if (!root.left) {
        return maxDepth(root.right);
    }
    if (!root.right) {
        return maxDepth(root.left);
    }

    return maxDepth(left) + maxDepth(right);
};