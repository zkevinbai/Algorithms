/* 
You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and it will automatically contact the police if two adjacent houses were broken into on the same night.
Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.

Example 1:
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
             Total amount you can rob = 1 + 3 = 4.
Example 2:
Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
Total amount you can rob = 2 + 9 + 1 = 12.

Edge case - want to skip houses to get max value
[3,1,1,4,1]

if first[0] + next[1] > (first[1] + next[1])
if first[0] + next[1] > (first[0] + next[0])

*/

// first solve for even odd
// const rob = (nums) => {
//     let evenSum = 0;
//     let oddSum = 0;

//     for (let i = 0; i > nums.length; i++) {
//         if ( i % 2 === 0 ) {
//             evenSum += nums[i];
//         } else {
//             oddSum += nums[i];
//         }
//     }

//     if (evenSum > oddSum) {
//         return evenSum;
//     } else {
//         return oddSum;
//     }
// };

// second solve to accomodate edge case
// [3, 1, 1, 4, 1]

// take the largest numbers
// 0 + 2 + 4
// 0 + 3
// 1 + 3

// const maxThree = (three) => {
//     if (three[0] >= three[1] && three[0] >= three[2]) {
//         return three[0];
//     } else if (three[1] >= three[0] && three[1] >= three[2]) {
//         return three[1];
//     } else {
//         return three[2];
//     }
// }

// const rob = (nums) => {
//     let sum = 0

//     let dup = nums.slice(0);

//     while(dup.length) {
//         const firstFive = dup.slice(0, 5);
//         dup = dup.slice(5, dup.length);

//         const possibleValues = [
//             firstFive[0] + (firstFive[2] || 0) + (firstFive[4] || 0),
//             firstFive[0] + (firstFive[3] || 0),
//             (firstFive[1] || 0) + (firstFive[3] || 0),
//         ]

//         sum += maxThree(possibleValues);
//     }

//     return sum;
// };

// const checkRange = (nums, n) => {
//     const two = nums[n] + nums[n + 2];
//     const three = nums[n] + nums[n + 3];

//     if (two > three) {
//         return two;
//     } else {
//         return three;
//     }
// };

// const rob = (nums) => {
//     let sum = 0

//     for (let i = 0; i < nums.length; i++) {
//         const currVal = checkRange(nums, i);
//         const nextVal = checkRange(nums, i + 1);

//         if (currVal > nextVal) {
//             sum += nums[i];
//             i = i + 2
//         } else {
//             sum += nums[i + 1];
//             i = i + 3
//         }
//     }

//     return sum;
// };

// position 1 2 3 4 5
// index    0 1 2 3 4
// values   3 1 1 4 3

// values   3 1 4 4 3

// const rob = (nums) => {
//     if (nums.length === 0) {
//         return 0;
//     } else if (nums.length === 1) {
//         return nums[0];
//     } else if (nums.length === 2) {
//         let first = nums[0];
//         let second = nums[1];

//         if (first > second) {
//             return first;
//         } else {
//             return second;
//         }
//     }

//     let houses = nums.slice(0);

//     houses[2] = houses[0] + houses[2];

//     for (let i = 3; i < houses.length; i++) {
//         backTwo = houses[i - 2];
//         backThree = houses[i - 3];

//         if (backTwo > backThree) {
//             houses[i] += backTwo;
//         } else {
//             houses[i] += backThree;
//         }
//     }

//     let lastHouse = houses[houses.length - 1];
//     let secondLastHouse = houses[houses.length - 2];

//     if (lastHouse > secondLastHouse) {
//         return lastHouse;
//     } else {
//         return secondLastHouse;
//     }
// };

const rob = (nums) => {
    if (nums.length === 0) {
        return 0;
    } else if (nums.length === 1) {
        return nums[0];
    } else if (nums.length === 2) {
        let first = nums[0];
        let second = nums[1];

        return Math.max(first, second);
    }

    let houses = nums.slice(0);

    houses[2] = houses[0] + houses[2];

    for (let i = 3; i < houses.length; i++) {
        backTwo = houses[i - 2];
        backThree = houses[i - 3];

        if (backTwo > backThree) {
            houses[i] += backTwo;
        } else {
            houses[i] += backThree;
        }
    }

    let lastHouse = houses[houses.length - 1];
    let secondLastHouse = houses[houses.length - 2];

    return Math.max(lastHouse, secondLastHouse);
};


