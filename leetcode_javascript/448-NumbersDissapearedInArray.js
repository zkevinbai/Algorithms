/* 
Given an array of integers where 1 ≤ a[i] ≤ n (n = size of array), some elements appear twice and others appear once.

Find all the elements of [1, n] inclusive that do not appear in this array.

Could you do it without extra space and in O(n) runtime? You may assume the returned list does not count as extra space.

Example:

Input:
[4,3,2,7,8,2,3,1]

Output:
[5,6]
*/


const findDisappearedNumbers = (nums) => {
    const dissappeared = [];

    if (nums.length === 0) {
        return dissappeared;
    }

    for (let i = 0; i < nums.length; i++) {
        // get absolute value because we will be manipulating positive / negative
        let value = Math.abs(nums[i]);
        // valuePosition is offset by 1 because we count from 0
        let valuePosition = value - 1;

        // set the absolute value of the number at the found position to be negative
        nums[valuePosition] = -1 * Math.abs(nums[valuePosition])
    }

    for (let i = 0; i < nums.length; i++) {
        let value = nums[i];

        // non found values are positive
        if (value > 0) {
            dissappeared.push(i + 1);
        }
    }

    return dissappeared;
};



// negative just like first missing positive