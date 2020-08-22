/* 
Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

Example:

Input: [-2,1,-3,4,-1,2,1,-5,4],
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.
Follow up:

If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.
*/

// find max contiguous sum;

const maxSubArray = (nums) => {
    let subArrayStart = 0;
    let subArrayEnd = 0;

    let maxSum = 0;
    let runningMaxSum = 0;

    for (let i = 0; i < nums.length; i++) {
        const value = nums[i];
        const possibleSum = runningMaxSum + value;

        if (value > possibleSum) {
            subArrayStart = i;
            runningMaxSum = value;
        } else {
            runningMaxSum = possibleSum;
        }

        if (runningMaxSum > maxSum) {
            maxSum = runningMaxSum;
            end = i;
        }
    }

    console.log(
        'subArrayStart: ', subArrayStart,
        'subArrayEnd: ', subArrayEnd,
    )

    return maxSum;
};

// const maxSubArray = (nums) => {
//     let subArraySum = nums.reduce((a, b) => a + b);

//     for (let i = 0; i < nums.length; i++) {
//         const startingIndex = i;

//         for (let n = i + 1; n < nums.length + 2; n++) {
//             let endingIndex = n;

//             const possibleSum = nums.slice(startingIndex, endingIndex)
//                 .reduce((a, b) => a + b);

//             if (possibleSum > subArraySum) {
//                 subArraySum = possibleSum;
//             }
//         }
//     }

//     return subArraySum;
// };