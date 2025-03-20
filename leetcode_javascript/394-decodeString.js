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

// regex solution
// https://regexr.com/3cr6f
// capture the following pattern number + [ + word + ]
// repeat the word, replace the number[word] with the repetitions
const decodeStringRegex = s => {
    while (s.includes('[')) {
        s = s.replace(/(\d+)\[(\w+)\]/g, (captured, number, word) => {
            // console.log(captured, number, word)
            return word.repeat(number)
        }
        );
    }
    return s;
};

const decodeString = (string) => {
    while (string.indexOf('[') !== -1) { // while we have not decoded all brackets
        let left = string.lastIndexOf('[');  // get innermost left bracket
        let right = left + string.substring(left).indexOf(']');
        // s.substring(left) grabs all values to right of left index
        // indexOf grabs the innermost right bracket
        let word = string.substring(left + 1, right)
        // left is the bracket, so + 1 
        // substring is not inclusive so right will nto count
        let count = '';  // account for count being more than one digit
        while (string[left - 1] >= 0) {
            // while left of [ is a number, keep grabbing it
            // 123[word] we want to replicate this 123 times, not 3 times

            left -= 1;
            // move left marker, we already have the word
            // now we are using it to 1 - figure out the count, 
            // 2 - figure out the left boundary of what we want to replace

            count = string[left] + count; // build count
        }

        // console.log({
        //     left,
        //     leftV: string[left],
        //     word,
        //     count
        // })

        string = string.substring(0, left) + word.repeat(count) + string.substring(right + 1)
        // left = substring from 0 to left, getting rid of the number
        // word = repeat the word per our count
        // right = substring from right + 1, substring includes start idx
    }

    return string;
}

// Achieve extremely brute force but working code
// will handle nested 3[xx2[a]]

const decodeStringBrute = (string) => {

    const expand = (count, startIndex) => {
        let left = startIndex;
        let right = left + 1;

        let expansion = '';

        while (right < string.length) {
            let rightVal = string[right];
            const parsedInt = parseInt(rightVal);

            if (parsedInt) {
                const expandedString = expand(parsedInt, right + 1);
                expansion += expandedString;
                right += expandedString.length + 1;
            } else if (rightVal === ']') {
                break;
            } else {
                expansion += rightVal;
                right += 1;
            }
        }

        const expansionCopy = expansion;

        while (count > 1) {
            expansion += expansionCopy;

            count -= 1;
        }

        return expansion;
    }

    for (let i = 0; i < string.length; i++) {
        const val = string[i];
        const parsedInt = parseInt(val);

        if (parsedInt) {
            const expandedString = expand(parsedInt, i + 1);

            let x = string.split('');
            x.splice(i, 1, expandedString);
            string = x.join('');
        }
    }


    const deleteBracketsInclusive = (string) => {
        const array = string.split('');

        let bracketStart;
        let bracketEnd;

        for (let i = 0; i < array.length; i++) {
            const val = array[i];

            if (val === '[') {
                bracketStart = i;
                bracketEnd = bracketStart + 2;

                let complimentsRequired = 1;

                while (bracketStart === i) {
                    if (array[bracketEnd] === ']' && complimentsRequired - 1 === 0) {
                        array.splice(bracketStart, bracketEnd - bracketStart + 1);
                        bracketStart = null;
                    }

                    if (array[bracketEnd] === '[') {
                        complimentsRequired += 1;
                    }

                    if (array[bracketEnd] === ']' && complimentsRequired - 1 !== 0) {
                        complimentsRequired -= 1;
                    }

                    bracketEnd += 1
                }
            }

        }

        return array.join('')
    }

    return deleteBracketsInclusive(string);
};



// achieved "axxaxxaxx[axx[x]]bcbc[bc]", just need to delete all content within brackets