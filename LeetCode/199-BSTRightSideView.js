/*
199. Binary Tree Right Side View

Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.

Example 1:

Input: root = [1,2,3,null,5,null,4]
Output: [1,3,4]
Example 2:

Input: root = [1,null,3]
Output: [1,3]
Example 3:

Input: root = []
Output: []


Constraints:

The number of nodes in the tree is in the range [0, 100].
-100 <= Node.val <= 100
*/
const levelOrder = function (root) {
    let levels = [];
    if (!root) return levels;

    let queue = [[root, 0]];

    while (queue.length) {
        const top = queue.shift();
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

const rightSideView = (root) => {
    const levels = levelOrder(root);

    const rightMost = [];

    levels.forEach((level) => rightMost.push(level[level.length - 1]).val);

    return rightMost;
};