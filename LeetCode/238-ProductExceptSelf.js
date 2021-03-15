/*
238. Product of Array Except Self
Medium

Given an array nums of n integers where n > 1,  
return an array output such that output[i] is equal to the product of all the elements of nums except nums[i].

Example:

Input:  [1,2,3,4]
Output: [24,12,8,6]
Constraint: It's guaranteed that the product of the elements of any prefix 
or suffix of the array (including the whole array) fits in a 32 bit integer.

Note: Please solve it without division and in O(n).

Follow up:
Could you solve it with constant space complexity? 
(The output array does not count as extra space for the purpose of space complexity analysis.)
*/

/*
solution explanation

example: 1 2 3 4

from left
1 / 1 = 1
1 * 2 / 2 = 1
1 * 2 * 3 / 3 = 2
1 * 2 * 3 * 4 / 4 = 6

leftArray = 1 1 2 6

from right 
4 / 4 = 1
4 * 3 / 3 = 4
4 * 3 * 2 / 2 = 12
4 * 3 * 2 * 1 / 1 = 24

rightArray = 24 12 4 1
rightArray reversed to be in same order as left array

product of left and right
leftArray = 1 1 2 6
rightArray = 24 12 4 1

answerArray = 24 12 8 6
*/


const productExceptSelf = (nums) => {

    // left
    let runningProduct = 1;

    const leftArray = Array(nums.length);
    leftArray[0] = runningProduct;

    for (let i = 0; i < nums.length; i++) {
        leftArray[i] = runningProduct // don't use the current number
        runningProduct *= nums[i];
    }

    // right
    runningProduct = 1;

    const rightArray = Array(nums.length);
    rightArray[nums.length - 1] = runningProduct;

    for (let i = nums.length - 1; i >= 0; i--) {
        rightArray[i] = runningProduct // don't use the current number
        runningProduct *= nums[i];
    }

    // const obj = {
    //     leftArray,
    //     rightArray
    // };
    // console.log(obj);

    const answer = Array(nums.length);
    for (let i = 0; i < nums.length; i++) {
        answer[i] = leftArray[i] * rightArray[i];
    }

    return answer;
};

// let demo = [1, 2, 3, 4];

// console.log(productExceptSelf(demo));