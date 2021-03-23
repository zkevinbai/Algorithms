/*
102. Binary Tree Level Order Traversal
Medium

Add to List

Share
Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

Example 1:

Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
Example 2:

Input: root = [1]
Output: [[1]]
Example 3:

Input: root = []
Output: []

Constraints:

The number of nodes in the tree is in the range [0, 2000].
-1000 <= Node.val <= 1000
*/

/*
bfs the tree
figure out the level with extra storage
*/

const levelOrder = function (root) {
    if (!root.val) return [[]];

    let levels = [];
    let queue = [[root, 0]];

    while (queue.length) {
        const top = queue.pop();
        const node = top[0];
        const level = top[1];

        if (node.left) {
            queue.push([node.left, level + 1])
        };
        if (node.right) {
            queue.push([node.right, level + 1])
        };

        if (!levels[level]) {
            levels[level] = [node.val];
        } else {
            levels[level].push(node.val);
        }
    }

    return levels;
};