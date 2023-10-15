/**
 * @param {string} s
 * @return {boolean}
 * 
https://leetcode.com/problems/valid-palindrome/description/

A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.



Example 1:

Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
Example 2:

Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.
Example 3:

Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.


Constraints:

1 <= s.length <= 2 * 105
s consists only of printable ASCII characters.

 */

var isPalindrome = function (s) {

    if (s.length <= 1) { return true }

    const getLetters = (string) => {
        // returns just the alphabet letters
        return string.replace(/[^a-zA-Z0-9]/g, "")
    }

    let str = getLetters(s).toLowerCase()

    // console.log(str)

    for (let i = 0; i < str.length / 2; i++) {
        let start = str[i]
        let end = str[str.length - 1 - i]

        if (start !== end) {
            console.log(start, i, end)
            return false
        }
    }

    return true
};