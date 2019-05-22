var majorityElement = function (nums) {
    let counterObject = {};

    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        if(counterObject[num]){
            counterObject[num] += 1;
        } else {
            counterObject[num] = 1;
        }
    }

    let keys = Object.keys(counterObject);

    let largestKey = keys[0]

    for (let i = 1; i < keys.length; i++) {
        let key = keys[i];
        
        if(counterObject[key] > counterObject[largestKey]){
            largestKey = key;
        }
    }

    return largestKey;
};