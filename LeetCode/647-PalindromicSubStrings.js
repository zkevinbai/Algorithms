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

const checkPalindrome = (string) => {
    if (string.length < 2) return true;

    const isEven = string.length % 2 === 0;
    let firstHalf = string.slice(0, string.length / 2);
    let secondHalf;

    if (isEven) {
        secondHalf = string.slice(string.length / 2, string.length);
    } else {
        secondHalf = string.slice(string.length / 2 + 1, string.length);
    }

    return firstHalf === secondHalf.split('').reverse().join('');
}

const countSubstrings = (string) => {
    let count = 0;
    let slow = 0;
    let fast = 1;

    while (slow < string.length) {
        const potentialPalindrome = string.slice(slow, fast);
        const isPalindrome = checkPalindrome(potentialPalindrome);

        // console.log(slow, fast, potentialPalindrome, isPalindrome);

        if (isPalindrome) {
            count += 1;
        }

        if (fast >= string.length) {
            console.log('hello')
            slow += 1;
            fast = slow + 1;
        } else {
            fast += 1;
        }
    }

    return count;
};

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
