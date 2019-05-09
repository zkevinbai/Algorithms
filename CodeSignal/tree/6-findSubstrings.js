// input
    // array of words
    // array of parts
// output
    // array of words, with the first/ longest part surrounded by brackets

// strategy
    // for each word, iterate through the parts, if it includes
        // find first index of
        // slice into 3
        // add brackets

function findSubstrings(words, parts) {
    let response = [];

    for(let i=0; i<words.length; i++){
        let word = words[i];

        let largestFirstPart = "";
        for (let j = 0; j < parts.length; j++) {
            let part = parts[j];
            
            if(word.indexOf(part) && part.length > largestFirstPart) {
                largestFirstPart = part;
            }
        }

        let startingIndex = word.indexOf(largestFirstPart);
        let endingIndex = startingIndex + largestFirstPart.length - 1;

        let firstHalf = word.split("").slice(0, startingIndex) + "[";
        let secondHalf = "]" + word.split("").slice(endingIndex);

        let newWord = firstHalf + secondHalf;
        response.push(newWord);
    }

    return response;
}
