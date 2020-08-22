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
    let subArrayEnd = nums.length + 1;
    let subArray = nums.slice(subArrayStart, subArrayEnd);


    return subArray.reduce((a, b) => a + b);
};