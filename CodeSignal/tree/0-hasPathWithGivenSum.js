//
// Definition for binary tree:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }

function hasPathWithGivenSum(t, s) {
    let queue = [t];
    let paths = [];

    while(queue.length){
        let shift = queue.shift();

        let newArray = [];
        
        paths.forEach( path => newArray.push(path.push(shift.value)) )

        paths = newArray;

        if(shift.left){
            queue.push(shift.left);
        }

        if(shift.right){
            queue.push(shift.right);
        }
    }

    return paths;
}
