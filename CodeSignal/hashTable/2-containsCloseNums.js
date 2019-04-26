// input
    // array of integers nums, integer k

// output
    // boolean indicating whether there is a pair of key value pairs (i, j)
        // where nums[i] = nums[j] and
        // the difference between i and j is less than or equal to k

// strategy
    // generate all pairs of i and j, with k or less in between

function containsCloseNums(nums, k) {
    let indices = [];

    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            let difference = j - i;
            if (difference <= k){
                indices.push([i, j])
            }
        }
    }

    for (let index = 0; index < indices.length; index++) {
        const i = indices[index][0];
        const j = indices[index][1];

        if (nums[i] === nums[j]){
            return true;
        }
    }

    return false;
}
