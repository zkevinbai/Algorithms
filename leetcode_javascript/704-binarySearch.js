/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 * 
 704. Binary Search
https://leetcode.com/problems/binary-search/description/
Given an array of integers nums which is sorted in ascending order, and an integer target, 
write a function to search target in nums. 
If target exists, then return its index. Otherwise, return -1.
You must write an algorithm with O(log n) runtime complexity.
 */

// iterative binary search

const search = (nums, target) => {
    let left = 0
    let right = nums.length

    while (left < right) {
        const mid = Math.floor((right + left) / 2)

        if (nums[mid] === target) {
            return mid
        } else if (nums[mid] > target) {
            // go left
            right -= 1
        } else {
            // go right
            left += 1
        }
    }

    return -1
};