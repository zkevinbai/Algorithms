/*
You are given an integer array nums sorted in ascending order, and an integer target.

Suppose that nums is rotated at some pivot unknown to you beforehand (i.e., [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2]).

If target is found in the array return its index, otherwise, return -1.



Example 1:

Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
Example 2:
                + + + - + +
Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
Example 3:

Input: nums = [1], target = 0
Output: -1


Constraints:

1 <= nums.length <= 5000
-10^4 <= nums[i] <= 10^4
All values of nums are unique.
nums is guranteed to be rotated at some pivot.
-10^4 <= target <= 10^4
*/

// Approach
// find the pivot
// binary search the two halves afterwards

const findPivot = (array) => {
    let index = 0;

    while (array[index] < array[index + 1]) {
        index += 1;
    }

    return index + 1;
}

const binarySearch = (array, target) => {
    let pivotIndex = array.length / 2;

    while (array[pivotIndex] !== target) {
        if (array[pivotIndex] > target) {
            pivotIndex = pivotIndex / 2;
        } else {
            pivotIndex = pivotIndex + pivotIndex / 2;
        }
    }

    return Math.floor(pivotIndex);
}

const search = (nums, target) => {
    const pivot = findPivot(nums);

    const newArray = [
        ...nums.slice(pivot, nums.length - 1),
        ...nums.slice(0, pivot),
    ];

};