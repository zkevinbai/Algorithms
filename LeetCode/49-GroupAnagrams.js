/*

https://leetcode.com/problems/group-anagrams/description/

Given an array of strings strs, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

Example 1:

Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
Example 2:

Input: strs = [""]
Output: [[""]]
Example 3:

Input: strs = ["a"]
Output: [["a"]]

Constraints:

1 <= strs.length <= 104
0 <= strs[i].length <= 100
strs[i] consists of lower-case English letters.

*/

const groupAnagrams = (strings) => {
    const anagrams = {};

    strings.forEach((string, index) => {
        const sortedString = string.split('').sort().join('');

        if (anagrams[sortedString]) {
            anagrams[sortedString].push(string);
        } else {
            anagrams[sortedString] = [string];
        }
    })

    return Object.values(anagrams);
};

// var groupAnagrams = (strings) => {
//     const hash = []

//     for (let i = 0; i < strings.length; i++) {
//         const word = strings[i]
//         const sortedWord = strings[i].split("").sort().join("")

//         if (!hash[sortedWord]) {
//             hash[sortedWord] = [word]
//         } else {
//             hash[sortedWord].push(word)
//         }
//     }

//     return hash.values()
// }
