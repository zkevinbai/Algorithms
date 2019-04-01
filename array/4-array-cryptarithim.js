// Input: 3 words in an array called crypt, a 2d array dictionary called solution
// Output: if the 3 words, once converted to numbers are valid numbers and
//         if the first 2 words add up to equal the 3rd word, return true, else false

function isCryptSolution(crypt, solution) {
    let encrypted = encrypt(crypt, solution);

    for (let i = 0; i < encrypted.length; i++) {
        const encryptedWord = encrypted[i];
        if (encryptedWord[0] === "0") return false;

        encrypted[i] = parseInt(encryptedWord);
    }

    return encrypted[0] + encrypted[1] === encrypted[2];
}

function dictionaryMaker(array) {
    let dictionary = {};

    array.forEach(subArray => {
        dictionary[subArray[0]] = subArray[1];
    });

    return dictionary;
}

function encrypt(crypt, solution) {
    let dictionary = dictionaryMaker(solution);

    let encrypted = [];

    crypt.forEach(word => {
        let encryptedWord = "";
        for (let i = 0; i < word.length; i++) {
            const letter = word[i];
            encryptedWord += dictionary[letter];
        }
        encrypted.push(encryptedWord);
    });

    return encrypted;
}

// let crypt = ["SEND", "MORE", "MONEY"]

// let solution = [
//     ["O", "0"],
//     ["M", "1"],
//     ["Y", "2"],
//     ["E", "5"],
//     ["N", "6"],
//     ["D", "7"],
//     ["R", "8"],
//     ["S", "9"]
// ]