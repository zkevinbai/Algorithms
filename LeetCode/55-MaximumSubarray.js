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
    let maxSum = nums[0];
    let currentSum = nums[0];

    for (let i = 1; i < nums.length; i++) {
        let value = nums[i];
        const currentSumAlreadyPositive = (currentSum > 0);

        if (!currentSumAlreadyPositive && currentSum < value) {
            currentSum = value;
        } else {
            currentSum += value;
            if (currentSumAlreadyPositive && currentSum < 0) {
                currentSum = 0;
            }
        }

        if (currentSum > maxSum) {
            maxSum = currentSum;
        }
    }

    return maxSum;
}

// const maxSubArray = (nums) => {
//     // set default maxSum to be the first value of the input
//     let maxSum = nums[0];

//     for (let i = 1; i < nums.length; i++) {
//         const potentialSum = nums[i] + nums[i - 1];
        
//         // memoize the runing sum up to nums[i]
//         if (potentialSum > nums[i]) {
//             nums[i] = potentialSum;
//         }

//         // check the memoized running sum against the max sum
//         if (nums[i] > maxSum) {
//             maxSum = nums[i];
//         }
//     }

//     return maxSum;
// }

// const maxSubArray = (nums) => {
//     if (nums.length === 1) {
//         return nums[0];
//     }

//     let currentSum = nums[0];
//     let maxSum = nums[0];

//     for (let i = 1; i < nums.length; i++) {
//         const value = nums[i];
//         possibleSum = value + currentSum;

//         if (value > possibleSum) {
//             currentSum = value;
//         } else {
//             currentSum = possibleSum;
//         }

//         if (currentSum > maxSum) {
//             maxSum = currentSum;
//         }
//     }

//     return maxSum;
// }

// const maxSubArray = (nums) => {
//     let subArrayStart = 0;
//     let subArrayEnd = 0;

//     let maxSum = nums[0];
//     let runningSum = 0;

//     for (let i = 0; i < nums.length; i++) {
//         const value = nums[i];
//         const possibleSum = runningSum + value;

//         if (value > possibleSum) {
//             subArrayStart = i;
//             runningSum = value;
//         } else {
//             runningSum = possibleSum;
//         }

//         if (runningSum > maxSum) {
//             maxSum = runningSum;
//             end = i;
//         }

//         console.log(
//             'subArrayStart: ', subArrayStart,
//             'subArrayEnd: ', subArrayEnd,

//             'maxSum: ', maxSum,
//             'runningSum: ', runningSum,

//             'value: ', value,
//             'possibleSum: ', possibleSum,
//         )
//     }

//     return maxSum;
// };

// const maxSubArray = (nums) => {
//     let maxSum = 0;

//     for (let i = 0; i < nums.length; i++) {
//         const value = nums[i];
//         const possibleSum = maxSum + value;

//         maxSum = Math.max(
//             possibleSum,
//             value,
//             maxSum,
//         );
//     }

//     return maxSum;
// };

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