var singleNumber = function (nums) {
    if(nums.length === 1) return nums[0];

    nums = nums.sort((a, b) => a - b);

    for (let index = 0; index < nums.length; index++) {
        let number = nums[index];
        if (index > 0) let prev = nums[index - 1];
        if (index < nums.length - 1) let next = nums[index + 1];

        if(index === 0){
            if(number !== next) return number;
        } else if(index === nums.length - 1){
            if (number !== prev) return number;
        } else {
            if (number !== prev && number !== next) return number;
        }
        
    }
};