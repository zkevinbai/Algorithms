/* 
Given a string s, find the length of the longest substring without repeating characters.

Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
Example 2:

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
Example 4:

Input: s = ""
Output: 0


Constraints:

0 <= s.length <= 5 * 104
s consists of English letters, digits, symbols and spaces.
*/

// dvdf edge case
// vdf is optimal
// keep track of index of character, reset traversal to one after initial instance of repeat

// need to keep in mind 0 is negative, so all positions are incremented by 1;

// 

const lengthOfLongestSubstring = (string) => {
    const array = string.split("");
    let charIndex = {};
    let subString = [];
    let maxLength = 0;

    for (let i = 0; i < array.length; i++) {
        const character = array[i];
        const prevCharIndex = charIndex[character];

        if (prevCharIndex && prevCharIndex !== i) {
            const afterPrevChar = array[prevCharIndex];
            subString = [afterPrevChar];
            charIndex = {};
            charIndex[afterPrevChar] = prevCharIndex + 1;
            i = prevCharIndex;
        } else if (prevCharIndex) {
            subString = [character]
            charIndex = {};
            charIndex[character] = i + 1;
        } else {
            subString.push(character);
            charIndex[character] = i + 1;
        }

        if (subString.length > maxLength) {
            maxLength = subString.length;
        }
    }

    return maxLength;
};