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

    if (t.left) leftTree = treeTraversal(t.left, "left");
    if (t.right) rightTree = treeTraversal(t.right, "right");

    console.log([leftTree, rightTree])
    return leftTree + "" === rightTree + "";
}

function treeTraversal(tree, direction) {
    let array = [];
    let queue = [tree];

    while (queue.length) {
        let shift = queue.shift();
        array.push(shift.value);

        if (direction === "left") {
            if (shift.left){
                queue.push(shift.left);
            } else {
                array.push("noLeft")
            }

            if (shift.right){
                queue.push(shift.right);
            } else {
                array.push("noRight")
            }
        } else if (direction === "right") {
            if (shift.right) {
                queue.push(shift.right);
            } else {
                array.push("noLeft")
            }

            if (shift.left) {
                queue.push(shift.left);
            } else {
                array.push("noRight")
            }
        }
    }

    return array;
}