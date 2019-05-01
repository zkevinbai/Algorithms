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

    while (stringOne.length && stringTwo.length) {
        let s1Shift = stringOne.shift();
        let s2Shift = stringTwo.shift();

        // compare by frequency
        let s1Freq = s1Frequency[s1Shift];
        let s2Freq = s2Frequency[s2Shift];

        if (s1Freq < s2Freq) {
            combined.push(s1Shift);
            combined.push(s2Shift);
        } else if (s2Freq < s1Freq) {
            combined.push(s2Shift);
            combined.push(s1Shift);
        } else if (s1Freq === s2Freq) {
            // compare by alphabet

            if (s1Shift < s2Shift) {
                combined.push(s1Shift);
                combined.push(s2Shift);
            } else if (s2Shift < s1Shift) {
                combined.push(s2Shift);
                combined.push(s1Shift);
            }
        }
    }

    combined = combined.concat(stringOne, stringTwo);

    return combined.join("");
}
