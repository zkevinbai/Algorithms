//
// Definition for binary tree:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }

function isTreeSymmetric(t) {
    if (!t) return true;
    let leftTree = true;
    let rightTree = true;

    if (t.left) leftTree = treeTraversal(t.left);
    if (t.right) rightTree = treeTraversal(t.right);

    return leftTree + "" === rightTree + "";
}

function treeTraversal(tree) {
    let array = [];
    let queue = [tree];

    while (queue.length) {
        let shift = queue.shift();
        array.push(shift.value);

        if (shift.left) queue.push(shift.left);
        if (shift.right) queue.push(shift.right);
    }

    return array;
}
