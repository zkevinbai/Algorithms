// input
    // stirng str
    // array of pairs that indicate which indices in the string can be swapped

// output
    // lexicographically largest string that results from allowed swaps
        // swaps can be done any number of times

    // translation
        // the alphabet positions of the letter should be ordered from biggest to smallest
        // dbcd > abcd because d comes after a in the alphabet

// strategy
    // create a hash of the alphabet, thus allowing lexicographical comparision of letters
    // generate all possible orderings of the string
    // using an updating largest value, compare all string indices
    
function swapLexOrder(str, pairs) {

}
