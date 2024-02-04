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

        // if letter is seen, and we are not in a 'aaa' edge case
        // move back to one after the previous sighting of the repeat
        if (prevCharIndex && prevCharIndex !== i) {
            const afterPrevChar = array[prevCharIndex];
            subString = [afterPrevChar];
            charIndex = {};
            charIndex[afterPrevChar] = prevCharIndex + 1;
            i = prevCharIndex;
        // if letter is seen, restart on the current location
        } else if (prevCharIndex) {
            subString = [character]
            charIndex = {};
            charIndex[character] = i + 1;
        // add character to the substring, update charIndex
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

/*


User
Explain the following code to me, what is its big o 

```
python - brent

class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        if not len(s):
            return 0
        longest = 1
        l = 0
        r = 1
        seen = set(s[l])
        while r < len(s):
            if s[r] not in seen:
                longest = max(longest, r - l + 1)
            else:
                while s[r] in seen:
                    seen.remove(s[l])
                    l += 1
            seen.add(s[r])
            r += 1

        return longest

*/