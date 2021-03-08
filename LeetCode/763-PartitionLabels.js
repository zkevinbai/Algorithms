/*
A string S of lowercase English letters is given. 
We want to partition this string into as many parts as possible so that each letter appears in at most one part, 
and return a list of integers representing the size of these parts.

Example 1:

Input: S = "ababcbacadefegdehijhklij"
Output: [9,7,8]
Explanation:
The partition is "ababcbaca", "defegde", "hijhklij".
This is a partition so that each letter appears in at most one part.
A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits S into less parts.

Note:

S will have length in range [1, 500].
S will consist of lowercase English letters ('a' to 'z') only.

thoughts

since each letter is confined to each segment, we just need to go letter by leetter
first letter start and stop
second letter start and stop
and so on
*/

// abab
// 3
// 

const partitionLabels = (string) => {
    const letterArray = string.split("");
    console.log(letterArray)

    const visitedLetters = {};

    let pointerStart = 0; // storage one
    let pointerEnd = 0;

    let currentPointerStart = null;
    let currentPointerEnd = null;
    let currentLetter = null;

    const partitions = [];

    for (currentPointerStart = 0; currentPointerStart < letterArray.length; currentPointerStart++) {

        currentLetter = letterArray[currentPointerStart];
        console.log("currentLetter", currentLetter)

        // check if we've used this already

        if (currentPointerStart === pointerEnd && visitedLetters[currentLetter]) {
            const partition = pointerEnd - pointerStart + 1;
            partitions.push(partition);
            pointerStart = pointerEnd + 1;
            continue;
        } else if (visitedLetters[currentLetter]) {
            continue;
        }

        // pointerStart = currentPointerStart;

        for (let index = currentPointerStart; index < letterArray.length; index++) {
            const letter = letterArray[index];

            if (letter === currentLetter) {
                currentPointerEnd = index;
            }
        }

        visitedLetters[currentLetter] = true

        if (currentPointerEnd > pointerEnd) {
            pointerEnd = currentPointerEnd;
        }

        console.log("pointerStart", pointerStart)
        console.log("pointerEnd", pointerEnd)
    }

    return partitions
};