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

const quicksort = (array) => {
    if (array.length < 2) return array;

    const randomIdx = Math.floor(Math.random() * array.length - 1);
    const pivot = array[randomIdx];
    // const pivot = array.splice(randomIdx, 1);

    // const pivot = array.shift(); this shouldn't matter;

    // cool thing about filter is that i never touch el = pivot;
    let left = array.filter((el) => el < pivot);
    let right = array.filter((el) => el > pivot);

    left = quicksort(left);
    right = quicksort(right);

    return left.concat(pivot, right);
}

const findKthLargest = function (nums, k) {
    // nums = nums.sort((a, b) => a - b);
    nums = quicksort((a, b) => a - b);

    return nums[nums.length - k];
};