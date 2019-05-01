// merge 
    // smaller comes before larger
        // rank smaller by frequency in substring
        // then rank by lexicographical frequency 

function mergeStrings(s1, s2) {
    let s1Frequency = {};
    let s2Frequency = {};

    for (let index = 0; index < s1.length; index++) {
        const s1Char = s1[index];

        if (!s1Frequency[s1Char]) {
            s1Frequency[s1Char] = 1;
        } else if (s1Frequency[s1Char]) {
            s1Frequency[s1Char] += 1;
        }
    }

    for (let index = 0; index < s2.length; index++) {
        const s2Char = s2[index];

        if (!s2Frequency[s2Char]) {
            s2Frequency[s2Char] = 1;
        } else if (s2Frequency[s2Char]) {
            s2Frequency[s2Char] += 1;
        }
    }

    let stringOne = s1.split("");
    let stringTwo = s2.split("");
    let combined = [];
    let shift;

    while (stringOne.length && stringTwo.length) {
        // compare by frequency
        let s1Freq = s1Frequency[stringOne[0]];
        let s2Freq = s2Frequency[stringTwo[0]];

        if (s1Freq < s2Freq) {
            shift = stringOne.shift();
        } else if (s2Freq < s1Freq) {
            shift = stringTwo.shift();
        } else if (s1Freq === s2Freq) {
            // compare by alphabet

            if (stringOne[0] < stringTwo[0]) {
                shift = stringOne.shift();
            } else {
                shift = stringTwo.shift();
            }
        }
        combined.push(shift);
    }

    combined = combined.concat(stringOne, stringTwo);

    return combined.join("");
}


// You are implementing your own programming language and you've decided to add support for merging strings. A typical merge function would take two strings s1 and s2, and return the lexicographically smallest result that can be obtained by placing the symbols of s2 between the symbols of s1 in such a way that maintains the relative order of the characters in each string.

// For example, if s1 = "super" and s2 = "tower", the result should be merge(s1, s2) = "stouperwer".



//     You'd like to make your language more unique, so for your merge function, instead of comparing the characters in the usual lexicographical order, you'll compare them based on how many times they occur in their respective strings(fewer occurrences means the character is considered smaller).If the number of occurrences are equal, then the characters should be compared in the usual way.If both number of occurences and characters are equal, you should take the characters from the first string to the result.

// Given two strings s1 and s2, return the result of the special merge function you are implementing.

