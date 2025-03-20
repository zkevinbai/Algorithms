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
// v2 - build backlog of end indices, and traverse accordingly
var partitionLabels = function (String) {
    if (!S) return [];

    const rightmostIndices = {};

    for (let i = 0; i < String.length; i++) {
        rightmostIndices[String[i]] = i;
    }

    let rightIndex = rightmostIndices[String[0]];
    let leftIndex = 0;
    const partitionLengths = [];

    for (let i = 0; i < String.length; i++) {
        if (i === rightmostIndex) {
            partitionLengths.push(i - leftIndex + 1);
            leftIndex = i + 1;
            rightIndex = rightmostIndices[String[i + 1]];
        } else {
            rightIndex = Math.max(rightIndex, rightmostIndices[String[i]]);
        }
    }

    return partitionLengths;
};


const partitionLabels = (string) => {
    const letterArray = string.split("");

    const visitedLetters = {};

    let pointerStart = null; // storage one
    let pointerEnd = null;

    let currentPointerStart = null;
    let currentPointerEnd = null;
    let currentLetter = null;

    const partitions = [];

    for (currentPointerStart = 0; currentPointerStart < letterArray.length; currentPointerStart++) {

        currentLetter = letterArray[currentPointerStart];

        if (currentPointerStart === pointerEnd) {
            const partition = pointerEnd - pointerStart + 1;
            partitions.push(partition);
            pointerStart = pointerEnd + 1;
            continue;
        } else if (visitedLetters[currentLetter]) {
            continue;
        }

        for (let index = currentPointerStart; index < letterArray.length; index++) {
            const letter = letterArray[index];

            if (letter === currentLetter) {
                currentPointerEnd = index;
            }
        }

        visitedLetters[currentLetter] = true

        if (currentPointerEnd > pointerEnd || currentPointerEnd === pointerStart) {
            pointerEnd = currentPointerEnd;
        }

        if (currentPointerStart === pointerEnd) {
            const partition = pointerEnd - pointerStart + 1;
            partitions.push(partition);
            pointerStart = pointerEnd + 1;
        }
    }

    return partitions
};

// v1
// abab
// 3
// 
// cabab
const partitionLabels = (string) => {
    const letterArray = string.split("");
    console.log(letterArray)

    const visitedLetters = {};

    let pointerStart = 0; // storage one
    let pointerEnd = null;

    let currentPointerStart = null;
    let currentPointerEnd = null;
    let currentLetter = null;

    const partitions = [];

    for (currentPointerStart = 0; currentPointerStart < letterArray.length; currentPointerStart++) {

        currentLetter = letterArray[currentPointerStart];
        console.log("currentLetter", currentLetter)

        // check if we've used this already

        if (currentPointerStart === pointerEnd) {
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

        if (currentPointerEnd > pointerEnd || currentPointerEnd === pointerStart) {
            pointerEnd = currentPointerEnd;
        }

        if (currentPointerStart === pointerEnd) {
            const partition = pointerEnd - pointerStart + 1;
            partitions.push(partition);
            pointerStart = pointerEnd + 1;
        }

        console.log("pointerStart", pointerStart)
        console.log("pointerEnd", pointerEnd)
    }

    return partitions
};