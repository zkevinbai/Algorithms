// O(1) memory, O(n) time
// string s of english letters
// find the first instance of a non-repeating character
// if no non-repeating characters return "_"

function firstNotRepeatingCharacter(s) {
    if (s.length === 1) return s;
    let pointerA = 0;
    let pointerB = 0;
    let unresolved = true;
    let noUniques = false;
    let settingSun = new Set();

    while (unresolved) {
        pointerB += 1;

        if (pointerB === s.length - 1 && s[pointerB] !== s[pointerA]) {
            if (settingSun.has(s[pointerA])) {
                pointerA += 1;
                pointerB = pointerA;
            } else {
                unresolved = false;
            }
        } else if (pointerA === s.length - 1) {
            unresolved = false;
            noUniques = true;
        } else if (s[pointerB] === s[pointerA]) {
            settingSun.add(s[pointerA]);
            pointerA += 1;
            pointerB = pointerA;
        }
    }

    if (noUniques) return "_";
    return s[pointerA];
}

// let s = "bccyb";
// firstNotRepeatingCharacter(s);