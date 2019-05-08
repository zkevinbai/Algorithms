//
// Definition for binary tree:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }

// Phase 2 - someone else's code

function isSubtree(t1, t2) {
    //if (!t1 && !t2) return true
    if (!t2) return true
    if (!t1) return false

    //t2 is a sub of t1 if
    //t1.left is t2 
    //or
    //t1.right is t2
    if (equal(t1.left, t2) || equal(t1.right, t2)) return true
    else return isSubtree(t1.left, t2) || isSubtree(t1.right, t2)
}


function equal(t1, t2) {
    if (!t1 && !t2) return true
    if (!t1 || !t2) return false
    if (t1.value !== t2.value) return false
    return equal(t1.left, t2.left) && equal(t1.right, t2.right)
}




// Phase 1 - my solution 13/14 timed out

// strategy
    // bfs the big tree
        // when a node's value is the same as the sub tree's root value
            // run a double bfs traversal on node and sub root
            // if node and sub root are the same, return true

    // return false at the end

function isSubtree(t1, t2) {
    if (!t1 && !!t2) return false;
    if (!t2) return true;

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

function treeTraversal(tree) {
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