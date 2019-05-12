//
// Definition for binary tree:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }

function deleteFromBST(t, queries) {
    for (let i = 0; i < queries.length; i++) {
        let query = queries[i];

        let foundNode;
        let queue = [t];

        while(queue.length){
            let shift = queue.shift();
            if(shift.value === query){
                foundNode = shift;
            }
        }
        
    }
}

// search BST

// find the element

// run deletion algorithm