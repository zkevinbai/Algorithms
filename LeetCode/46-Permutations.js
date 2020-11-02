/*
Given a collection of distinct integers, return all possible permutations.

permutations refer to all unique orderings 

Example:

Input: [1,2,3]
Output:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
*/

const permute = (nums) => {
    return generatePermutations({ candidates: nums });
};

const generatePermutations = ({
    candidates,
    currentIndex = 0,
    currentPermutation = [],
    validPermutatons = [],
}) => {
    if (currentPermutation.length > candidates.length) {
        return;
    }

    if (currentPermutation.length === candidates.length) {
        validPermutatons.push(currentPermutation.slice());

        return;
    }

    for (let candidateIndex = 0; candidateIndex < candidates.length; candidateIndex++) {
        const candidate = candidates[candidateIndex];

        if (candidateIndex !== currentIndex && currentIndex !== 0) {
            currentPermutation.push(candidate);
        }

        generatePermutations({
            candidates,
            currentIndex: candidateIndex,
            currentPermutation,
            validPermutatons,
        })

        currentPermutation.pop();
    }

    return permutatons;
}