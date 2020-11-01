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
*/

* can use external call


function combinationSumRecursive({
    candidates,
    remainingSum,
    validCombinations = [],
    currentCombination = [],
    startFrom = 0,
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

        combinationSumRecursive({
            candidates,
            remainingSum: remainingSum - currentCandidate,
            validCombinations,
            currentCombination,
            startFrom: candidateIndex,
        });

        currentCombination.pop();
    }

    return validCombinations;
}

const combinationSum = (candidates, target) => {
    let validCombinations = [];
    let currentCombination = [];
    let startFrom = 0;

    combinationSumRecursive({
        candidates,
        remainingSum: target,
        validCombinations,
        currentCombination,
        startFrom,
    })

    return finalCombinations;
};

function combinationSumRecursive({
    candidates,
    remainingSum,
    finalCombinations = [],
    currentCombination = [],
    startFrom = 0,
}) {
    if (remainingSum < 0) {
        // By adding another candidate we've gone below zero.
        // This would mean that the last candidate was not acceptable.
        return;
    }

    if (remainingSum === 0) {
        // If after adding the previous candidate our remaining sum
        // became zero - we need to save the current combination since it is one
        // of the answers we're looking for.
        finalCombinations.push(currentCombination.slice());

        return;
    }

    // If we haven't reached zero yet let's continue to add all
    // possible candidates that are left.
    for (let candidateIndex = startFrom; candidateIndex < candidates.length; candidateIndex += 1) {
        const currentCandidate = candidates[candidateIndex];

        // Let's try to add another candidate.
        currentCombination.push(currentCandidate);

        // Explore further option with current candidate being added.
        combinationSumRecursive({
            candidates,
            remainingSum: remainingSum - currentCandidate,
            finalCombinations,
            currentCombination,
            candidateIndex,
        });

        // BACKTRACKING.
        // Let's get back, exclude current candidate and try another ones later.
        currentCombination.pop();
    }

    return finalCombinations;
}

const combinationSum = (candidates, target) => {
    let validCombinations = [];
    let currentCombination = [];
    let startFrom = 0;
    let sum = 0;

    combinationSumRecursive({
        combinations,
        remainingSum: target,
        validCombinations,
        currentCombination,
        startFrom,
    })

    return validCombinations;

    return sumFinder({
        candidates,
        target,
        start,
        sum,
        potentialCombination,
        validCombinations,
    });

};

const sumFinder = ({
    candidates,
    target,
    start,
    sum,
    potentialCombination,
    validCombinations,
}) => {
    if (sum > target) {
        return validCombinations;
    }

    if (sum === target) {
        validCombinations.push(potentialCombination);
        return validCombinations;
    }

    for (let candidateIndex = start; candidateIndex < candidates.length; candidateIndex++) {
        const candidate = candidates[candidateIndex];
        potentialCombination.push(candidate);

        sumFinder({
            candidates,
            target,
            start: candidateIndex,
            sum: sum + candidate,
            potentialCombination,
            validCombinations,
        });

        potentialCombination.pop();// why do this?
    }

    return validCombinations;
}
