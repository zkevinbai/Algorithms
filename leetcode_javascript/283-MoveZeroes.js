const moveZeroes = (nums) => {
    let left = 0
    let right = 0

    // move everything non zero to the front
    while (right < nums.length) {
        if (nums[right] != 0) {
            // swap non zero elements with the left pointer
            let temp = nums[left]
            nums[left] = nums[right]
            nums[right] = temp
            left ++
        }

        right ++
    }
}

// Working solution
var moveZeroes2019 = function (nums) {
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