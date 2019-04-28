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
    // [x] create helper to get lexicographic value
    // [] generate all the pairs and store in perms object
    // generate all possible orderings of the string
    // using an updating largest value, compare all string indices

    // this strategy fails to generate all possible swap results
        // how do I account for infinite swaps?

// function swapLexOrder(str, pairs) {
//     if (str.length < 2) {
//         return str;
//     }
//     let perms = new Object(); debugger;
//     perms[str] = lexValue(str);

//     for (let i = 0; i < pairs.length; i++) {
//         const pair = pairs[i];
        
//         let keys = Object.keys(perms);

//         for (let j = 0; j < keys.length; j++) {
//             let dup = keys[j].split("");

//             let pairZeroValue = dup[pair[0] - 1];
//             let pairOneValue = dup[pair[1] - 1];

//             dup[pair[0] - 1] = pairOneValue;
//             dup[pair[1] - 1] = pairZeroValue;
    
//             dup = dup.join("");

//             if(!perms[dup]){
//                 perms[dup] = lexValue(dup);
//             }
//         }
//     }

//     return perms;
// }

// function lexValue(str){
//     const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
//     let array = str.split("");

//     function lexReduce(accumulator, currentValue) {
//         return alphabet.indexOf(accumulator) - alphabet.indexOf(currentValue);
//     }

//     return array.reduce(lexReduce);
// }

    
// strategy 2
    // create a sorted array of all unique numbers provided in the pairs
        // create default order 1, 2, 3 
            // get the chars in that order
        // create a dup of the chars in lexicographical order 
        // swap all chars for those in lexicographical order

    // this strategy fails when you have separated values
        // str: "abcdefgh"
        // pairs: [[1, 4],[7, 8]]

        // Output:
            // "hbcgefda"
        // Expected Output:
            // "dbcaefhg"

// function swapLexOrder(str, pairs) {
//     // generate normal order
//     let normalOrder = new Array();
//     let set = new Set();
//     for (let i = 0; i < pairs.length; i++) {
//         const pair = pairs[i];

//         let j = pair[0];
//         if (!set.has(j)){
//             set.add(j);
//             normalOrder.push(j - 1);
//         }

//         let k = pair[1];
//         if (!set.has(k)){
//             set.add(k);
//             normalOrder.push(k - 1);
//         }
//     }

//     normalOrder = normalOrder.sort(); 
    
//     // generate normal chars
//     let normalChars = [];
//     for (let index = 0; index < normalOrder.length; index++) {
//         const char = str[normalOrder[index]];
//         normalChars.push(char);
//     }

//     // generate lexicographical chars
//     let lexOrderChars = normalChars.slice(0).sort(lexSort);

//     let dupArray = str.split("");
//     for (let index = 0; index < normalOrder.length; index++) {
//         const normalIdx = normalOrder[index];
//         const lexChar = lexOrderChars[index];

//         dupArray[normalIdx] = lexChar;
//     }

//     return dupArray.join("");
// }

// function lexSort(a, b) {
//     const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

//     let indexA = alphabet.indexOf(a);
//     let indexB = alphabet.indexOf(b);

//     return indexB - indexA;
// }

// let str = "abdc";
// let pairs = [[1, 4],[3, 4]];

// Strategy 3 - Someone else's code
function swapLexOrder(str, pairs) {
    const charMap = {};
    let mostConnections = 1;

    // function to store connections between indices
    const mapNum = (index1, index2) => {
        if (!charMap[index1]) {
            charMap[index1] = { [index1]: null, [index2]: null };
            charMap[index1].connections = 1;
        } else {
            charMap[index1][index2] = null;
            charMap[index1].connections++;
        }
        // iterations required to store all the connections
        charMap[index1].connections > mostConnections ? mostConnections = charMap[index1].connections : null;
    }

    pairs.forEach(pair => {
        mapNum(pair[0], pair[1]);
        mapNum(pair[1], pair[0])
    })

    while (mostConnections > 0) {
        for (let index1 in charMap) {
            delete charMap[index1].connections
            for (let index2 in charMap[index1]) {
                Object.keys(charMap[index1]).forEach(index => {
                    charMap[index2][index] = null;
                })
            }
        }
        mostConnections--;
    }

    // will need to delete available chars but preserve connections
    const linkMap = JSON.parse(JSON.stringify(charMap));

    let largestStr = '';

    for (let i = 1; i < str.length + 1; i++) {
        if (charMap[i]) {
            // list of available chars - [char, index]
            var chain = Object.keys(charMap[i]).map(num => {
                return [str[num - 1], num];
            }).sort();
            largestStr += chain[chain.length - 1][0];
            // remove char from available chars
            Object.keys(linkMap[chain[chain.length - 1][1]]).forEach(num => {
                delete charMap[num][chain[chain.length - 1][1]];
            })
        } else {
            // if no pair for this index, use existing char
            largestStr += str[i - 1];
        }
    }

    return largestStr;
}