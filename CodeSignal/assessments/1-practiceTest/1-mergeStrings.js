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
