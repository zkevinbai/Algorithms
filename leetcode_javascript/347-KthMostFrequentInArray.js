/*

https://leetcode.com/problems/top-k-frequent-elements/description/

Given a non-empty array of integers, return the k most frequent elements.

Example 1:

Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
Example 2:

Input: nums = [1], k = 1
Output: [1]
Note:

You may assume k is always valid, 1 ≤ k ≤ number of unique elements.
Your algorithm's time complexity must be better than O(n log n), where n is the array's size.
It's guaranteed that the answer is unique, in other words the set of the top k frequent elements is unique.
You can return the answer in any order.
*/

const kthMostFrequent = (nums, k) => {
    const numberCount = {};

    nums.forEach((number) => {
        if (!numberCount[number]) {
            numberCount[number] = 1;
        }

        numberCount[number] += 1;
    })

    const UniqueNums = Object.keys(numberCount);

    UniqueNums.sort((a, b) => (numberCount[b] - numberCount[a]));

    return UniqueNums.slice(0, k);
};

var topKFrequent = function (nums, k) {
    return kthMostFrequent(nums, k);
};


var topKFrequent = (nums, k) => {

    const frequencies = {}

    for (let i = 0; i < nums.length; i++) {
        const number = nums[i]

        if (!frequencies[number]) {
            frequencies[number] = [number]
        } else {
            frequencies[number].push(number)
        }
    }

    const frequencyArray = Object.keys(frequencies).sort(
        (a, b) => frequencies[b].length - frequencies[a].length
    )

    // console.log(
    //     frequencies,
    //     frequencyArray
    // )

    return frequencyArray.slice(0, k)
}
