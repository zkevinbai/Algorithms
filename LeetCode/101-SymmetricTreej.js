/*
Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center).

For example, this binary tree [1,2,2,3,4,4,3] is symmetric:

    1
   / \
  2   2
 / \ / \
3  4 4  3


But the following [1,2,2,null,3,null,3] is not:

    1
   / \
  2   2
   \   \
   3    3

 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
*/

// i think a valid strategy would be to reverse a child tree
// and then check if the left and right trees are identical

// recursive
const flipTree = (root) => {
    if (root.right.right || root.right.left) {
        root.right = flipTree(root.right);
    }

    if (root.left.right || root.left.left) {
        root.left = flipTree(root.left);
    }

    const rightTree= root.right;
    root.right = root.left;
    root.left = rightTree;

    return root;
}

const compareTwoTrees = (rootOne, rootTwo) => {
    if (rootOne.val !== rootTwo.val) {
        return false;
    }

    if (rootOne.right || rootTwo.right) {
        compareTwoTrees(rootOne.right, rootTwo.right);
    }

    if (rootOne.left || rootTwo.left) {
        compareTwoTrees(rootOne.left, rootTwo.left);
    }

}

const isSymmetric = (root) => {
    const flippedLeft = flipTree(root.left);

    return compareTwoTrees(root.right, flippedLeft);
}