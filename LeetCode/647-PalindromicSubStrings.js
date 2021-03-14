/*
Given a string, your task is to count how many palindromic substrings in this string.

The substrings with different start indexes or end indexes are counted as different substrings even they consist of same characters.

    Example 1:

Input: "abc"
Output: 3
Explanation: Three palindromic strings: "a", "b", "c".


    Example 2:

Input: "aaa"
Output: 6
Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".


    Note:

The input string length won't exceed 1000.
*/

const isPalindrome = (string) => {
    const isEven = string.length % 2 === 0;
    let firstHalf = string.slice(0, string.length / 2);
    let secondHalf;

    if (isEven) {
        secondHalf = string.slice(string.length / 2, string.length - 1);
    } else {
        secondHalf = string.slice(string.length / 2 + 1, string.length - 1);
    }

    return firstHalf === secondHalf;
}

const countSubstrings = (string) => {
    const count = 0;

    for
};
