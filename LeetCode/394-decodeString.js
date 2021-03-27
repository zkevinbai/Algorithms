/*
394. Decode String
Medium

Given an encoded string, return its decoded string.

The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.

You may assume that the input string is always valid; No extra white spaces, square brackets are well-formed, etc.

Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k. For example, there won't be input like 3a or 2[4].



Example 1:

Input: s = "3[a]2[bc]"
Output: "aaabcbc"
Example 2:

Input: s = "3[a2[c]]"
Output: "accaccacc"
Example 3:

Input: s = "2[abc]3[cd]ef"
Output: "abcabccdcdcdef"
Example 4:

Input: s = "abc3[cd]xyz"
Output: "abccdcdcdxyz"


Constraints:

1 <= s.length <= 30
s consists of lowercase English letters, digits, and square brackets '[]'.
s is guaranteed to be a valid input.
All the integers in s are in the range [1, 300].
*/

const expand = (count, string) => {

    const expansionCopy = string;

    while (count) {
        string += expansionCopy;

        count -= 1;
    }

    return string;
}


const decodeString = (string) => {
    for (let i = 0; i < string.length; i++) {
        const val = string[i];
        const parsedInt = parseInt(val);

        if (!!parsedInt) {
            const expandedString = expand(parsedInt, i + 1);

            string.splice(i, expandedString.length + 1, expandedString);

            i += expandedString.length + 1;
        }
    }

    return string;
};

// const decodeString = (string) => {

//     const expand = (count, startIndex) => {
//         let left = startIndex;
//         let right = left + 1;

//         let expansion = '';

//         while (right < string.length) {
//             let rightVal = string[right];
//             const parsedInt = parseInt(rightVal);

//             if (parsedInt) {
//                 const expandedString = expand(parsedInt, right + 1);
//                 expansion += expandedString;
//                 right += expandedString.length + 1;
//             } else if (rightVal === ']') {
//                 break;
//             } else {
//                 expansion += rightVal;
//                 right += 1;
//             }
//         }

//         const expansionCopy = expansion;

//         while (count) {
//             expansion += expansionCopy;

//             count -= 1;
//         }

//         return expansion;
//     }
    
//     for (let i = 0; i < string.length; i++) {
//         const val = string[i];
//         const parsedInt = parseInt(val);

//         if (parsedInt) {
//             const expandedString = expand(parsedInt, i + 1);

//             string.splice(i, expandedString.length + 1, expandedString);

//             i += expandedString.length + 1;
//         }
//     }

//     return string;
// };