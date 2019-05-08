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
