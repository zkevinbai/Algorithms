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
const expandCheck = (string, left, right) => {
    let palindromeCount = 0;

    // console.log(left, right)

    while (left >= 0 && right <= string.length && (string[left] === string[right])) {
        palindromeCount += 1;

        // console.log(string.slice(left, right+1))

        left -= 1;
        right += 1;
    }

    // console.log('===')

    return palindromeCount
};

const countSubstrings = (string) => {
    let count = 0;

    for (let i = 0; i < string.length; i++) {
        count += expandCheck(string, i, i); // odd, [a, b, a] (left = a, right = a)
        count += expandCheck(string, i, i + 1); // even, [a, b, a] (left = a, right = b)
    }

    return count;
};

// const countSubstringsTwoPointer = (string) => {
//     let count = 0;
//     let slow = 0;
//     let fast = 1;

//     while (slow < string.length) {
//         const potentialPalindrome = string.slice(slow, fast);
//         const isPalindrome = checkPalindrome(potentialPalindrome);

//         // console.log(slow, fast, potentialPalindrome, isPalindrome);

//         if (isPalindrome) {
//             count += 1;
//         }

//         if (fast >= string.length) {
//             console.log('hello')
//             slow += 1;
//             fast = slow + 1;
//         } else {
//             fast += 1;
//         }
//     }

//     return count;
// };

// const countSubstrings = (string) => {
//     let count = 0;

//     for (let i = 0; i < string.length; i++) {
//         for (let j = i + 1; j < string.length + 1; j++) {
//             const potentialPalindrome = string.slice(i, j);
//             const isPalindrome = checkPalindrome(potentialPalindrome);
//             // console.log(potentialPalindrome, isPalindrome);

//             if (isPalindrome) {
//                 count += 1;
//             }
//         }
//     }

//     return count;
// };
