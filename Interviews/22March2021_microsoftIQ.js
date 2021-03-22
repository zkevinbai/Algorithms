/*
1

Input
String consists of upercase letters
String contains at least one BALLOON

Output
How many BALLOONS does the word contain
*/

/*
solution,

balloon is 7 letters long
 1 b
 1 a
 2 l
 2 0
 1 n

count the B A L O N
divide by baloon usage

return the lowest number 
(intuition, you can have 100 ls, but if you only have one b, your count is 1)
 */

function solution(S) {
    const letters = {};

    for (let i = 0; i < S.length; i++) {
        const letter = S[i];

        if (letters[letter]) {
            letters[letter] += 1;
        } else {
            letters[letter] = 1;
        }
    }

    let bCount = letters['B'] / 1;
    let aCount = letters['A'] / 1;
    let lCount = letters['L'] / 2;
    let oCount = letters['O'] / 2;
    let nCount = letters['N'] / 1;

    return Math.floor(Math.min(bCount, aCount, lCount, oCount, nCount));
}


let example = 'QAWABAWONL';

console.log(solution(example));