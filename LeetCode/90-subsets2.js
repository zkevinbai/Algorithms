/*
Given an integer array nums that may contain duplicates, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.



Example 1:

Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
Example 2:

Input: nums = [0]
Output: [[],[0]]


Constraints:

1 <= nums.length <= 10
-10 <= nums[i] <= 10
*/

const uniqueSubsets = (array) => {
    array = array.sort();  // need to sort, repeating numbers = order matters;
    let res = [[]];

    let uniqueSubsets = {}

    for (let i = 0; i < array.length; i++) {
        number = array[i];
        newArr = [];

        for (let j = 0; j < res.length; j++) {
            const newSubset = res[j].concat(number);

            if (!uniqueSubsets[newSubset]) {
                uniqueSubsets[newSubset] = true;
                newArr.push(newSubset);
            }
        }

        res = res.concat(newArr);
    }

    return res;
}