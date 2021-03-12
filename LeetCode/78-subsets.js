/*
Given an integer array nums of unique elements, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.



Example 1:

Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
Example 2:

Input: nums = [0]
Output: [[],[0]]


Constraints:

1 <= nums.length <= 10
-10 <= nums[i] <= 10
All the numbers of nums are unique.
*/

// iterative

const subsets = (array) => {
    let res = [[]];

    for (let i = 0; i < array.length; i++) {
        number = array[i];
        newArr = [];

        for (let j = 0; j < res.length; j++) {
            const newSubset = res[j].concat(number);
            newArr.push(newSubset);
        }

        res = res.concat(newArr);
    }

    return res;
}