const moveZeroes = function (nums) {
    nums.sort((a, b) => a - b);

    while (nums[0] === 0) {
        let shift = nums.shift();

        nums.push(shift)
    }

    return nums
};