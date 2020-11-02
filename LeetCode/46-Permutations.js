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

    for (let positionIndex = 0; positionIndex < candidates.length; positionIndex++) {
        const permutationPrefix = subPermutations.slice(0, positionIndex);
        const permutationPostfix = subPermutations.slice(positionIndex);

        permutations.push([permutationPrefix.concat(firstOption, permutationPostfix)]);
    }

    return permutatons;
}