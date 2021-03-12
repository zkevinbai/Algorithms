/*
Given an integer array nums and an integer k, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.

Example 1:

Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
Example 2:

Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4

Constraints:

1 <= k <= nums.length <= 104
-104 <= nums[i] <= 104
*/

const quickSort = (array) => {
    if (array.length < 2) return array;

    const compare = (x, y) => {
        if (x < y) return - 1;
        return 1;
    }

    const pivot = array.shift();

    let left = array.filter((el) => compare(el, pivot) === -1);
    let right = array.filter((el) => compare(el, pivot) != -1);

    left = quickSort(left);
    right = quickSort(right);

    return left.concat([pivot]).concat(right);
}

const findKthLargest = function (nums, k) {
    // nums = nums.sort((a, b) => a - b);
    nums = quickSort((a, b) => a - b);

    return nums[nums.length - k];
};