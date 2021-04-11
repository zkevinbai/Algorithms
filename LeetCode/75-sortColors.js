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

// approach 3 goldilocks
/*
1s are solved for free

can do 0s and 1s: get 0's from left, get 1s from 0's last spot or 0
* will be fine if 0 is missing because we put 1s to left of 2s
* will be fine if 1 is missing because we put 0s to left of 2s
* will be fine if 2 is missing because we put 0s to left of 1s

can do 0s and 2s: get zeros from left, get 2s from right
* will break if 0 is missing because we put 2s to right of 1s
* will be fine if 1 is missing because we put 0s to left of 2s
* will be fine if 2 is missing because we put 0s to left of 1s

*/

const sortColors = function (arr) {
    // left and i match zeroes, starting from left
    let left = 0 // 0 index is where the 0s begin
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == 0) {
            [arr[left], arr[i]] = [arr[i], arr[left]];
            left++ // just used this space, move up by one
        }
    }

    // match mid and i to ones, starting where zeroes left off
    // let mid = i
    // for (let i = 0; i < arr.length; i++) {
    //     if (arr[i] == 1) {
    //         [arr[i], arr[mid]] = [arr[mid], arr[i]]
    //         mid++
    //     }
    // }

    // right and j match twos, starting from right
    let right = arr.length - 1; // length - 1 index is where the 2s begin
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == 2) {
            [arr[i], arr[right]] = [arr[right], arr[i]];
            right-- // just used this space, move down by one
        }
    }
};

// approach 2, way too complex
// const sortColors = (nums) => {
//     const swap = (left, right) => {
//         [nums[left], nums[right]] = [nums[right], nums[left]];
//     }

//     let l = 0;
//     let r = nums.length - 1;

//     let i = 0;

//     while (l < r) {
//         if (nums[i] === 0) {
//             swap(i, l);
//             l++
//         } else if (nums[i] === 2) {
//             swap(i, r)
//             r--
//         } else {
//             i++
//         }
//     }
// }
// quicksort implementation, non-working
// const compare = function (x, y) {
//     if (x < y) return -1;
//     else return 1;
// };

// var sortColors = function (nums) {
//     nums.sort()
//     if (nums.length < 2) return nums;

//     let pivot = nums[0];
//     let left = nums.slice(1).filter(el => compare(el, pivot) !== 1);
//     let right = nums.slice(1).filter(el => compare(el, pivot) === 1);
//     nums = sortColors(left).concat(pivot, sortColors(right))
//     console.log(nums)
//     return nums
// };