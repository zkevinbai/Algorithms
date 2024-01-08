// Working solution
var moveZeroes = function (nums) {
    for (let index = nums.length - 1; index >= 0; index--) {
        if (nums[index] === 0) {
            nums.splice(index, 1);
            nums.push(0);
        }
    }
};

// Working solution (if stable sort, so Chrome not Node)

// const moveZeroes = function (nums) {
//     nums.sort(function (a, b) {
//         if (a == 0 && b != 0)
//             return 1;
//         else if (b == 0 && a != 0)
//             return -1;
//         else
//             return 0;
//     });
// };