/*
287. Find the Duplicate Number
Medium

7024

754

Add to List

Share
Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.

There is only one repeated number in nums, return this repeated number.



Example 1:

Input: nums = [1,3,4,2,2]
Output: 2
Example 2:

Input: nums = [3,1,3,4,2]
Output: 3
Example 3:

Input: nums = [1,1]
Output: 1
Example 4:

Input: nums = [1,1,2]
Output: 1


Constraints:

2 <= n <= 3 * 104
nums.length == n + 1
1 <= nums[i] <= n
All the integers in nums appear only once except for precisely one integer which appears two or more times.


Follow up:

How can we prove that at least one duplicate number must exist in nums?
Can you solve the problem without modifying the array nums?
Can you solve the problem using only constant, O(1) extra space?
Can you solve the problem with runtime complexity less than O(n2)?
*/


/*
solution
modifies the array
use the indexes as storage, flip each index negative to indicate that its number is found
constant storage, constant time
*/

var findDuplicate = function (nums) {
    for (let i = 0; i < nums.length; i++) {
        const num = Math.abs(nums[i]);

        if (nums[num - 1] < 0) {
            return num;
        } else {
            nums[num - 1] *= -1;
        }
    }
};

/*
solution (if the numbers were a range from 1 to n)
sum all numbers up to n,
sum the array,
subtract, get the duplicate
*/