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
 * @return {boolean}
 */

const flipTree = (root) => {
    if (!root) {
        return null;
    }

    if (root.right) {
        root.right = flipTree(root.right);
    }

    if (root.left) {
        root.left = flipTree(root.left);
    }

    const rightTree = root.right;

    root.right = root.left;
    root.left = rightTree;

    return root;
}

const compareTwoTrees = (rootOne, rootTwo) => {
    console.log('r1', rootOne, 'r2', rootTwo)
    if (!rootOne || !rootTwo) {
        console.log("hello")
        return false;
    }

    if (rootOne.val !== rootTwo.val) {
        return false;
    }

    let isLeftSame = true;
    let isRightSame = true;

    if (rootOne.right || rootTwo.right) {
        isRightSame = compareTwoTrees(rootOne.right, rootTwo.right);
    }

    if (rootOne.left || rootTwo.left) {
        isLeftSame = compareTwoTrees(rootOne.left, rootTwo.left);
    }

    return (isLeftSame === true && isRightSame === true);
}

const isSymmetric = (root) => {
    if (!root || (!root.left && !root.right)) {
        return true;
    }

    const left = flipTree(root.left);
    // console.log(left);
    // console.log(root.right)
    // console.log(compareTwoTrees(flipTree(root.left), root.right) )

    return compareTwoTrees(left, root.right);
}