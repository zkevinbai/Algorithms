//
// Definition for binary tree:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }

function hasPathWithGivenSum(t, s) {
    if (!t) return s === 0;
    s -= t.value;
    return hasPathWithGivenSum(t.left, s) ||
        hasPathWithGivenSum(t.right, s);
}

// function hasPathWithGivenSum(t, s) {
//     let stack = [t];
//     let paths = [];

//     let path = [];
//     while(stack.length){
//         if()
//     }

//     return paths;
// }
