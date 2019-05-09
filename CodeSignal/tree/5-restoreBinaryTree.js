//
// Definition for binary tree:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }

function restoreBinaryTree(inorder, preorder) {
    let shift = preorder.shift();
    let root = Tree(shift);

    let inorderRootIndex = inorder.indexOf(shift);

    root.left = restoreBinaryTree(inorder.slice(0, inorderRootIndex), preorder)
    root.left = restoreBinaryTree(inorder.slice(inorderRootIndex, inorder.length), preorder)

    return root;
}
