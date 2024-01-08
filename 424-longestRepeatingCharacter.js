/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 
https://leetcode.com/problems/longest-repeating-character-replacement/

You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.

Return the length of the longest substring containing the same letter you can get after performing the above operations.

Example 1:

Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.
Example 2:

Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.
There may exists other ways to achieve this answer too.

Constraints:

1 <= s.length <= 105
s consists of only uppercase English letters.
0 <= k <= s.length

 */

var characterReplacement = function (s, k) {
    let left = 0;
    let maxCount = 0;
    const charCount = {};

    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        charCount[char] = (charCount[char] || 0) + 1;

        maxCount = Math.max(maxCount, charCount[char]);

        if (right - left + 1 - maxCount > k) {
            // Too many replacements needed, shrink the window from the left.
            const leftChar = s[left];
            charCount[leftChar]--;
            left++;
        }
    }

    return s.length - left;
};



// const longestSubstring = function (string) {
//     let longest = 1
//     let currentLength = 1

//     for (let i = 0; i < string.length; i++) {
//         const currVal = string[i]
//         const nextVal = string[i + 1]

//         // console.log({
//         //     currVal,
//         //     nextVal
//         // })

//         if (nextVal) {
//             if (currVal === nextVal) {
//                 currentLength += 1
//                 // if (currentLength > longest) {
//                 //     longest = currentLength
//                 // }
//             } else {
//                 if (currentLength > longest) {
//                     longest = currentLength
//                 }
//                 currentLength = 1
//             }
//         }
//     }

//     return longest
// }

// var characterReplacement = function (s, k) {
//     if (s.length === 1) {
//         return 1
//     }

//     if (k === 0) {
//         return longestSubstring(s)
//     }

//     let startingIdx = 0
//     let activeIdx = startingIdx

//     let longestSubstring = 1
//     let currentLongest = 1
//     let kcount = k

//     while (activeIdx < s.length) {
//         const currentVal = s[activeIdx]

//         const nextIdx = activeIdx + 1
//         const nextVal = s[nextIdx]

//         if (nextVal === currentVal) {
//             currentLongest += 1
//         } else if (kcount > 0) {
//             currentLongest += 1
//             kcount -= 1
//             startingIdx = nextIdx
//         } else {
//             if (currentLongest > longestSubstring) {
//                 longestSubstring = currentLongest
//             }
//             currentLongest = 1
//             kcount = k
//             activeIdx = nextIdx
//         }

//         activeIdx += 1
//     }

//     return longestSubstring
// };

// s = "ABAB"
// k = 2

// characterReplacement(s, k)