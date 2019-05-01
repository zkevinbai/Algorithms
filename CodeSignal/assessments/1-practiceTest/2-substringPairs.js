function mergeStrings(s1, s2) {
    let alphabet = "abcdefghijklmnopqrstuvwxyz";

    let s1Frequency = {}; 
    let s2Frequency = {};

    for (let index = 0; index < s1.length; index++) {
        const s1Char = s1[index];
        const s2Char = s2[index];
        
        if (!s1Frequency[s1Char]) {
            s1Frequency[s1Char] = 1;
        } else if (s1Frequency[s1Char]) {
            s1Frequency[s1Char] += 1;
        }
        
        if (!s2Frequency[s2Char]) {
            s2Frequency[s2Char] = 1;
        } else if (s2Frequency[s2Char]) {
            s2Frequency[s2Char] += 1;
        }
    }



}
