// input
    // array of numbers
    // target we must sum to
// output 
    // exactly one pair of indices that sum to target;

var twoSum = function (nums, target) {
    let pairs = [];

    for (let i = 0; i < nums.length; i++) {
        const first = nums[i];
        for (let j = i + 1; j < nums.length - 1; j++) {
            const second = nums[j];

            if (first + second === target){
                pairs = [i, j];
            }
        }
    }

    return pairs;
};
