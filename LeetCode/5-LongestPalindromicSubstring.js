/*
Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.

Example 1:

Input: "babad"
Output: "bab"
Note: "aba" is also a valid answer.
Example 2:

Input: "cbbd"
Output: "bb"
*/

// go through array once
// grab all indices of letters
// check all letters first and last indices
// see if the slice of that is a palindrome

// palindrome must start and end with the same letters
// non duplicated numbers cannot be the start and end of the palindrome

// 92 / 103 test cases passed.

const longestPalindrome = (string) => {
    if (string.length < 2) {
        return string;
    }

    if (isPalindrome(string.split(""))) {
        return string;
    }

    const array = string.split("");
    const letterCount = {};
    const possiblePalindromes = [];
    let maxPalindrome = [];

    // get an object of letter counts;
    for (let i = 0; i < array.length; i++) {
        const letter = array[i];

        if (letterCount[letter]) {
            letterCount[letter].push(i);
        } else {
            letterCount[letter] = [i];
        }
    }

    // check all instances of 2+ letters;
    // generate all possible start ends
    const presentLetters = Object.keys(letterCount);

    for (let i = 0; i < presentLetters.length; i++) {
        const letter = presentLetters[i];
        const letterInstances = letterCount[letter];

        if (letterInstances.length > 1) {

            for (let i = 0; i < letterInstances.length - 1; i++) {
                for (let n = i + 1; n < letterInstances.length; n++) {
                    possiblePalindromes.push([letterInstances[i], letterInstances[n]]);
                }
            }
        }
    }

    for (let i = 0; i < possiblePalindromes.length; i++) {
        const palinromePair = possiblePalindromes[i];
        const palindrome = array.slice(palinromePair[0], palinromePair[1] + 1);

        if (isPalindrome(palindrome) && palindrome.length > maxPalindrome.length) {
            maxPalindrome = palindrome;
        }
    }

    if (maxPalindrome.length < 2) {
        return array[0];
    }

    return maxPalindrome.join("");
};

// get to half point, cut the array
// see if both halves are equal

const isPalindrome = (array) => {
    const arrayLength = array.length;
    const isOdd = (arrayLength % 2);
    const pivot = arrayLength / 2;

    let leftHalf = array.slice(0, pivot);
    let rightHalf = array.slice(pivot, arrayLength + 1);

    if (isOdd) {
        rightHalf = array.slice(pivot + 1, arrayLength + 1);
    }

    for (let i = 0; i < leftHalf.length; i++) {
        const leftVal = leftHalf[i];
        const rightVal = rightHalf[rightHalf.length - 1 - i];

        if (leftVal !== rightVal) {
            return false;
        }
    }

    return true;
}