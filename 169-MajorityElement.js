const majorityElement = (nums) => {
    if (nums.length === 1) return nums[0]

    const numCount = {}
    let highestCount = 0
    let majorityValue = nums[0]

    for (let i = 0; i < nums.length; i++) {
        const num = nums[i]

        if (numCount[num]) {
            numCount[num]++
        } else {
            numCount[num] = 1
        }

        // console.log(numCount[num], highestCount)

        if (numCount[num] > highestCount) {
            highestCount = numCount[num]
            majorityValue = num
        }
    }

    // console.log(numCount)

    return majorityValue
}

var majorityElement2019 = function (nums) {
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