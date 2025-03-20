/* 
Find First and Last Position of Element in Sorted Array
Medium

4251

168

Add to List

Share
Given an array of integers nums sorted in ascending order, find the starting and ending position of a given target value.

If target is not found in the array, return [-1, -1].

Follow up: Could you write an algorithm with O(log n) runtime complexity?

Example 1:

Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
Example 2:

Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]
Example 3:

Input: nums = [], target = 0
Output: [-1,-1]


Constraints:

0 <= nums.length <= 105
-109 <= nums[i] <= 109
nums is a non-decreasing array.
-109 <= target <= 109
*/

//O(n)
const searchRange = (array, target) => {
    if (array.length === 0) {
        return [-1, -1];
    }

    if (array.length === 1 && array[0] !== target) {
        return [-1, -1];
    }

    let leftPointer = 0;
    let rightPointer = array.length - 1;

    while (array[leftPointer] !== target && leftPointer < array.length - 1) {
        leftPointer += 1;
    }

    while (array[rightPointer] !== target && rightPointer > 0) {
        rightPointer -= 1;
    }

    if (leftPointer === array.length - 1 && rightPointer === 0 && array[leftPointer] !== target) {
        return [-1, -1];
    }

    return [leftPointer, rightPointer];
};

//O(log(n))
// const binarySearch = (array, target) => {
//     if (!array.length) return -1;
//     if (array.length === 1 && array[0] !== target) return -1;

//     const pivotIndex = Math.floor(array.length / 2);
//     const pivotVal = array[pivotIndex];

//     const leftArray = array.slice(0, pivotIndex);
//     const rightArray = array.slice(pivotIndex, array.length);

//     if (pivotVal === target) {
//         return pivotIndex;
//     } else if (pivotVal < target) {
//         const rightSearch = binarySearch(rightArray, target);
//         if (rightSearch > 0) {
//             return pivotIndex + rightSearch;
//         } else {
//             return -1;
//         }
//     } else if (pivotVal > target) {
//         return binarySearch(leftArray, target);
//     }
// }

// const searchRange = (array, target) => {
//     if (array.length === 0) {
//         return [-1, -1];
//     }

//     if (array.length === 1 && array[0] !== target) {
//         return [-1, -1];
//     }

//     const targetPivot = binarySearch(array, target);

//     if (targetPivot === -1) {
//         return [-1, -1];
//     }

//     let leftPointer = targetPivot;
//     let rightPointer = targetPivot;

//     while (array[leftPointer - 1] === target) {
//         leftPointer -= 1;
//     }

//     while (array[rightPointer - 1] === target) {
//         rightPointer -= 1;
//     }

//     return [leftPointer, rightPointer];
// };
