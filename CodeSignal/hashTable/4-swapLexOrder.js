// input
    // stirng str
    // array of pairs that indicate which indices in the string can be swapped

// output
    // lexicographically largest string that results from allowed swaps
        // swaps can be done any number of times

    // translation
        // the alphabet positions of the letter should be ordered from biggest to smallest
        // dbcd > abcd because d comes after a in the alphabet

// strategy 1
    // create a hash of the alphabet, thus allowing lexicographical comparision of letters
    // generate all possible orderings of the string
    // using an updating largest value, compare all string indices
    
// strategy 2
    // create a sorted array of all unique numbers provided in the pairs
        // create default order 1, 2, 3 
        // create a dup of sorted lexicographical order 3, 2, 1
            // [] DO THIS
        // make those changes, and return that as the answer

function swapLexOrder(str, pairs) {
    debugger;
    let normalOrder = new Array();
    let set = new Set();
    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i];

        let j = pair[0];
        if (!set.has(j)){
            set.add(j);
            normalOrder.push(j - 1);
        }

        let k = pair[1];
        if (!set.has(k)){
            set.add(k);
            normalOrder.push(k - 1);
        }
    }

    normalOrder = normalOrder.sort();
    let reverseOrder = normalOrder.slice(0).reverse();

    let dupArray = str.split("");
    for (let index = 0; index < normalOrder.length; index++) {
        const normalIdx = normalOrder[index];
        const normalChar = str[normalIdx];

        const reverseIdx = reverseOrder[index];
        const reverseChar = str[reverseIdx];
        
        dupArray[normalIdx] = reverseChar;
        dupArray[reverseIdx] = normalChar;
    }

    return dupArray.join("");
}

let str = "abdc";
let pairs = [[1, 4],[3, 4]];

swapLexOrder(str, pairs);