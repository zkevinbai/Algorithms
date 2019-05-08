//
// Definition for binary tree:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }

// strategy
    // bfs the big tree
        // when a node's value is the same as the sub tree's root value
            // run a double bfs traversal
            // if full traversal, return true

    // return false at the end


function isSubtree(t1, t2) {
    if (!t1) return true;
    if (!t2) return true;

    let values = [];

    let queue = [t1];

    while (queue.length) {
        let shift = queue.shift();

        if(shift.value === t2.value){
            if(compareTwoTrees(shift, t2)){
                return true;
            }
        }
        
        if (shift.left) {
            queue.push(shift.left)
        }
        if (shift.right) {
            queue.push(shift.right)
        }
    }

    return false;
}

function compareTwoTrees(treeOne, treeTwo){
    let traverseOne = treeTraversal(treeOne);
    let traverseTwo = treeTraversal(treeTwo);

    return traverseOne + "" === traverseTwo + "";
}

function treeTraversal(tree, direction) {
    let array = [];
    let queue = [tree];

    while (queue.length) {
        let shift = queue.shift();
        array.push(shift.value);

        if (shift.left) {
            queue.push(shift.left);
        } else {
            array.push("noLeft")
        }

        if (shift.right) {
            queue.push(shift.right);
        } else {
            array.push("noRight")
        }
    }

    return array;
}