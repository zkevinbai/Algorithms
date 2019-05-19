// input
    // array of numbers
    // target we must sum to
// output 
    // exactly one pair of indices that sum to target;

// strategy 2 O(n)
var twoSum = function (nums, target) {
    let potentials = {};

    for (let i = 0; i < nums.length; i++) {
        let number = target - nums[i];

        potentials[number] = i;
    }

    for (let i = 0; i < nums.length; i++) {
        let number = nums[i];

        if (potentials[number]){
            return [i, potentials[number]]
        }
    }

    return [];
};


// strategy 1 brute force O(n^2))
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

