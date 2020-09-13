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

const longestPalindrome = (string) => {

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