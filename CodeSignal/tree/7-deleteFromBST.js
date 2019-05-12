//
// Definition for binary tree:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }

// search BST

// find the element

// run deletion algorithm

function deleteFromBST(t, queries) {
    let queries2 = [];
    for (let i = 0; i < queries.length; i++) {
        let query = queries[i];

        let foundNode = false;
        let queue = [t];

        // find the target node using BFS
        while(queue.length || foundNode){
            let shift = queue.shift();
            if(shift.value === query){
                foundNode = shift;
            } else {
                if(shift.left){
                    queue.push(shift.left)
                }
                if(shift.right){
                    queue.push(shift.right)
                }
            }
        }
        
        // delete the node from the BST
        if(foundNode){
            // find the right most node of its left side

            let nodeLeft = foundNode.left;
            let rightMost = nodeLeft;

            while(rightMost.right){
                rightMost = rightMost.right;
            }

            // rebase the found node at the rightMost/ replace found Node
        }
    }

}
