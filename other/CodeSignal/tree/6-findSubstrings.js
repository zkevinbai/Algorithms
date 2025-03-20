// input
// array of words
// array of parts
// output
// array of words, with the first/ longest part surrounded by brackets

// strategy 2 add someone else's code
function findSubstrings(words, parts) {
    var trie = [{}];
    for (var part of parts) {
        var pos = 0;
        for (var ch of part) {
            var next = trie[pos][ch];
            if (!next) {
                next = trie.push({}) - 1;
                trie[pos][ch] = next;
            }
            pos = next;
        }
        trie[pos].end = part;
    }

    return words.map(
        word => {
            var states = [];
            for (var i = 0, x = 0, y = 0; i < word.length; ++i) {
                var ch = word[i];

                states.push(0);
                states = states.map(
                    state => trie[state][ch]
                ).filter(
                    state => state
                );

                for (var end of states.map(state => trie[state].end))
                    if (end && (!y || y - x < end.length)) {
                        x = i - end.length + 1;
                        y = i + 1;
                    }
            }
            return !y ? word :
                word.slice(0, x) + "[" +
                word.slice(x, y) + "]" +
                word.slice(y);

        }
    );
}


// phase 1 14/16
// strategy
// for each word, iterate through the parts, if it includes
// find first index of
// slice into 3
// add brackets

function findSubstrings(words, parts) {
    let response = [];

    for (let i = 0; i < words.length; i++) {
        let word = words[i];

        let largestFirstPart = "";
        for (let j = 0; j < parts.length; j++) {
            let part = parts[j];

            if (word.includes(part) && part.length === largestFirstPart.length && word.indexOf(part) < word.indexOf(largestFirstPart)) {
                largestFirstPart = part;
            } else if (word.includes(part) && part.length > largestFirstPart.length) {
                largestFirstPart = part;
            }
        }

        if (largestFirstPart.length) {
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
