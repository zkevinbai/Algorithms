var singleNumber = function (nums) {
    if (nums.length === 1) return nums[0];

    nums = nums.sort((a, b) => a - b);

    for (let index = 0; index < nums.length; index++) {
        let number = nums[index];
        let prev;
        let next;

        if (index === 0) {
            next = nums[index + 1];
            if (number !== next) return number;
        } else if (index === nums.length - 1) {
            prev = nums[index - 1];
            if (number !== prev) return number;
        } else {
            next = nums[index + 1];
            prev = nums[index - 1];
            if (number !== prev && number !== next) return number;
        }

    }
};