/*
 trivial to do this with sort, my solution is without sort and making use of for key of loop
*/

const isAnagram = (s, t) => {
    if (s.length !== t.length) {
        return false
    }

    const sLetters = {}
    const tLetters = {}

    for (let i = 0; i < s.length; i++) {
        sLetters[s[i]] ? sLetters[s[i]] += 1 : sLetters[s[i]] = 1;

        tLetters[t[i]] ? tLetters[t[i]] += 1 : tLetters[t[i]] = 1
    }

    const sLetterKeys = Object.keys(sLetters)

    // console.log(sLetters, tLetters)
    // console.log(sLetterKeys)

    for (const key of sLetterKeys) {
        // console.log(!!tLetters['t'])
        if (!tLetters[key]) {
            return false
        } else if (sLetters[key] !== tLetters[key]) {
            // console.log('hi2')
            return false
        }
    }

    const tLetterKeys = Object.keys(tLetters)

    for (const key of tLetterKeys) {
        if (!sLetters[key]) {
            // console.log('hi3')
            return false
        } else if (sLetters[key] !== tLetters[key]) {
            // console.log('hi4')
            return false
        }
    }

    return true
}