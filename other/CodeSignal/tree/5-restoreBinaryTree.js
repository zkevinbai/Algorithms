//
// Definition for binary tree:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }

function restoreBinaryTree(inorder, preorder) {
    if (!inorder.length) return null;

    let shift = preorder.shift();
    let root = new Tree(shift);

    let inorderRootIndex = inorder.indexOf(shift);

    root.left = restoreBinaryTree(inorder.slice(0, inorderRootIndex), preorder)
    root.right = restoreBinaryTree(inorder.slice(inorderRootIndex + 1, inorder.length), preorder)

    return root;
}
