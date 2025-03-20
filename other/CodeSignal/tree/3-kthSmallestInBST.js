//
// Definition for binary tree:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }

// input

// output

// strategy
    // BFS traversal
    // sort traversal
    // find the nth largest

function kthSmallestInBST(t, k) {
    let values = [];

    let queue = [t];

    while(queue.length){
        let shift = queue.shift();
        values.push(shift.value);

        if(shift.left){
            queue.push(shift.left)
        }
        if(shift.right){
            queue.push(shift.right)
        }
    }

    return values.sort((a, b) => a - b)[k-1];
}
