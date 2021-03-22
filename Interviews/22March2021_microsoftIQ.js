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

sort the array
count the B A L O N and S

balloon is 6 letters long
each balloon 
 1 b
 1 a
 2 l
 2 0
 1 n

 make an inventory of letters;
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