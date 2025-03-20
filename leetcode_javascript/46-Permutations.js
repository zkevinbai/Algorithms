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

const permuteWithoutRepetitions = (permutationOptions) => {
    if (permutationOptions.length === 1) {
        return [permutationOptions];
    }

    const permutations = [];

    const subPermutations = permuteWithoutRepetitions(permutationOptions.slice(1));

    const firstOption = permutationOptions[0];

    for (let permIndex = 0; permIndex < subPermutations.length; permIndex++) {
        const subPermutation = subPermutations[permIndex];

        // why <= ? because you cannot slice past the length of the array
        for (let positionIndex = 0; positionIndex <= subPermutation.length; positionIndex++) {
            const permutationPrefix = subPermutation.slice(0, positionIndex);
            const permutationPostfix = subPermutation.slice(positionIndex);

            permutations.push(permutationPrefix.concat(firstOption, permutationPostfix));
        }
    }

    return permutations;
}