/*
Invert a binary tree.

Example:

Input:

     4
   /   \
  2     7
 / \   / \
1   3 6   9
Output:

     4
   /   \
  7     2
 / \   / \
9   6 3   1
*/

// solved as a part of is symmetric

const invertTree = (root) => {
    if (!root) {
        return null;
    }

    if (root.left) {
        root.left = invertTree(root.left);
    }
    if (root.right) {
        root.right = invertTree(root.right);
    }

    const leftTree = root.left;

    root.left = root.right;
    root.right = leftTree;

    return root;
}

// const flipTree = (root) => {
//     if (!root) {
//         return null;
//     }

//     if (root.left) {
//         root.left = flipTree(root.left);
//     }
//     if (root.right) {
//         root.right = flipTree(root.right);
//     }

//     const leftTree = root.left;

//     root.left = root.right;
//     root.right = leftTree;

//     return root;
// }
