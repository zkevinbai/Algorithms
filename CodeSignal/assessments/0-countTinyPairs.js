// input 
    // 2 arrays of integers a and b of the same length
    // integer k
// output
    // integer number of tiny pairs
        // pairs (x, y) such that x is from a and y is from b
        // iterating through array a from left to right
        // iterating through b from right to left
        // to be tiny, the concatenation xy is less than k
    
function countTinyPairs(a, b, k) {
    let revB = b.reverse();
    let tinyCount = 0;

    for (let index = 0; index < a.length; index++) {
        const elementA = a[index];
        const elementB = revB[index];
        let concat = elementA + "" + elementB;
        concat = parseInt(concat);

        if (concat < k){
            tinyCount += 1;
        }
    }

    return tinyCount;
}

let a = [1, 2, 3];
let b = [1, 2, 3]; 
let k = 31;
    