/*
Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

It is guaranteed that the number of unique combinations that sum up to target is less than 150 combinations for the given input.

Example 1:

Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
Explanation:
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.
Example 2:

Input: candidates = [2,3,5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]
Example 3:

Input: candidates = [2], target = 1
Output: []
Example 4:

Input: candidates = [1], target = 1
Output: [[1]]
Example 5:

Input: candidates = [1], target = 2
Output: [[1,1]]


Constraints:

1 <= candidates.length <= 30
1 <= candidates[i] <= 200
All elements of candidates are distinct.
1 <= target <= 500

https://www.programcreek.com/2014/02/leetcode-combination-sum-java/
https://github.com/trekhleb/javascript-algorithms/blob/master/src/algorithms/sets/combination-sum/combinationSum.js
*/

// addition solution
const combinationSum = (candidates, target) => {
    return combinationSumAddition({
        candidates,
        target,
    })
};

const combinationSumAddition = ({
    candidates,
    target,
    startFrom = 0,
    currentSum = 0,
    currentCombination = [],
    validCombinations = [],
}) => {
    if (currentSum > target) {
        return;
    }

    if (currentSum === target) {
        validCombinations.push(currentCombination.slice());
        return;
    }

    for (let candidateIndex = startFrom; candidateIndex < candidates.length; candidateIndex++) {
        const candidate = candidates[candidateIndex];
        currentCombination.push(candidate);

        combinationSumAddition({
            candidates,
            target,
            startFrom: candidateIndex,
            currentSum: currentSum + candidate,
            currentCombination,
            validCombinations,
        });

        currentCombination.pop();// this allows you to start new trees of possibility
    }

    return validCombinations;
}

// subtraction solution; saves 2 lines of code but is harder to follow
const combinationSum = (candidates, target) => {
    return combinationSumSubtraction({
        candidates,
        remainingSum: target,
    })
};

function combinationSumSubtraction({
    candidates,
    startFrom = 0,
    remainingSum,
    validCombinations = [],
    currentCombination = [],
}) {
    if (remainingSum < 0) {
        return;
    }

    if (remainingSum === 0) {
        validCombinations.push(currentCombination.slice());
        return;
    }

    for (let candidateIndex = startFrom; candidateIndex < candidates.length; candidateIndex += 1) {
        const currentCandidate = candidates[candidateIndex];

        currentCombination.push(currentCandidate);

        combinationSumSubtraction({
            candidates,
            startFrom: candidateIndex,
            remainingSum: remainingSum - currentCandidate,
            validCombinations,
            currentCombination,
        });

        currentCombination.pop();
    }

    return validCombinations;
}