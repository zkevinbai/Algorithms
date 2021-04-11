/*
Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.



Example 1:

Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
Example 2:

Input: nums = [2,0,1]
Output: [0,1,2]
Example 3:

Input: nums = [0]
Output: [0]
Example 4:

Input: nums = [1]
Output: [1]


Constraints:

n == nums.length
1 <= n <= 300
nums[i] is 0, 1, or 2.


Follow up:

Could you solve this problem without using the library's sort function?
Could you come up with a one-pass algorithm using only O(1) constant space?
*/


var sortColors = function (nums) {
    //     // get zeroes / reds
    //     let zeroCount = 0;
    //     let oneCount = 0;
    //     let twoCount = 0;

    //     nums.forEach((num) => {
    //         if (num === 0) zeroCount += 1;
    //         if (num === 1) oneCount += 1;
    //         if (num === 2) twoCount += 1;
    //     })

    //     // get twos / blues

    //     const zeroes = new Array(zeroCount).fill(0);
    //     const ones = new Array(oneCount).fill(1);
    //     const twos = new Array(twoCount).fill(2);

    // zeroes.concat(ones, twos);
};