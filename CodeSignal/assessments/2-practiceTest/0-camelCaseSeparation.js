function camelCaseSeparation(words, variableName) {
    let allWords = words.slice();debugger

    // generate all upper case versions of the words;
    for (let index = 0; index < words.length; index++) {
        const word = words[index];
        let newWord = [word[0].toUpperCase()];
        newWord = newWord.concat(word.slice(1).split(""));
        allWords.push(newWord.join(""))
    }

    let dupVariable = variableName

    allWords.forEach(word => {
        dupVariable = dupVariable.replace(word, "")
    });

    // let dupVariable = variableName.split("");

    // for (let i = 0; i < dupVariable.length; i++) {
    //     for (let j = i + 1; j < dupVariable.length; j++) {
    //         let slice = dupVariable.slice(i, j).join("");

    //         if (allWords.includes(slice)){
    //             dupVariable = dupVariable.slice(j);
    //         }
    //     }
    // }

    if(dupVariable.length){
        return false;
    } else {
        return true;
    }
}

// let words = ["is",
//     "valid",
//     "right"]
// let variableName = "isValid"