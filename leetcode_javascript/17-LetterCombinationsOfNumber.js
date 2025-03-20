/* 
Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent.

A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

Example:

Input: "23"
Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
Note:

Although the above answer is in lexicographical order, your answer could be in any order you want.
*/
const phone = {
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['p', 'q', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z'],
}

const letterCombinations = (digits) => {
    const numbers = digits.split('');
    // pre populate with first letter
    let combinations = phone[numbers.shift()];

    for (let i = 0; i < numbers.length; i++) {
        const number = numbers[i];
        const letters = phone[number];
        let newCombinations = [];

        console.log(combinations)

        // this gets lexicographical order
        // combinations.forEach(combination => {
        //     newCombinations = newCombinations.concat(
        //         letters.map(letter => combination + letter)
        //     );
        // });

        letters.forEach(letter => {
            newCombinations = newCombinations.concat(
                combinations.map(value => value + letter)
            );
        });

        combinations = newCombinations;
    }

    return combinations;
};