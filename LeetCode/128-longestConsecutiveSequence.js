/*

https://leetcode.com/problems/longest-consecutive-sequence/description/

Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in O(n) time.


Example 1:

Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
Example 2:

Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9
 

Constraints:

0 <= nums.length <= 105
-109 <= nums[i] <= 109

*/

var longestConsecutive = function (nums) {
    const sortedNums = nums.sort(function (a, b) { return a - b })

    let longest = 0
    let currentLongest = 0

    console.log(sortedNums)

    for (let i = 0; i < sortedNums.length; i++) {
        let currentNum = sortedNums[i]
        let nextNum = sortedNums[i + 1]

        console.log({ currentNum, nextNum })
        console.log({ longest, currentLongest })

        if (nextNum && currentNum + 1 == nextNum) {
            if (currentLongest == 0) {
                currentLongest = 2
            } else {
                currentLongest += 1
            }
        } else {
            currentLongest = 0
        }

        if (currentLongest > longest) {
            longest = currentLongest
        }
    }

    return longest
};