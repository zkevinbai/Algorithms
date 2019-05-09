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

        let largestFirstPart;
        for (let j = 0; j < parts.length; j++) {
            let part = parts[j];
            
            if(word.includes(part) && part.length > largestFirstPart) {
                largestFirstPart = part;
            }
        }

        if (largestFirstPart){
            let startingIndex = word.indexOf(largestFirstPart);
            let endingIndex = startingIndex + largestFirstPart.length;

            let wordArr = word.split("");

            let left = wordArr.slice(0, startingIndex);
            let mid = wordArr.slice(startingIndex, endingIndex);
            let right = wordArr.slice(endingIndex);

            left.push("[");
            mid.push("]");

            let newWord = left.join("") + mid.join("") + right.join("");
            response.push(newWord);
        } else {
            response.push(word);
        }
    }

    return response;
}
