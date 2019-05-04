function camelCaseSeparation(words, variableName) {
    let allWords = words.slice();debugger

    // generate all upper case versions of the words;
    for (let index = 0; index < words.length; index++) {
        const word = words[index];
        let newWord = [word[0].toUpperCase()];
        newWord = newWord.concat(word.slice(1).split(""));
        allWords.push(newWord.join(""))
    }

    allWords.sort((a,b) => b.length - a.length);

    let dupVariable = variableName

    allWords.forEach(word => {
        while(dupVariable.includes(word)){
            dupVariable = dupVariable.replace(word, "")
        }
    });

    if(dupVariable.length){
        return false;
    } else {
        return true;
    }
}

words = ["ayrtu",
    "ceinm",
    "nbcyjsghf",
    "ukw",
    "in",
    "noiobkq",
    "eqlpggfocl",
    "cri",
    "ikgtzxc",
    "oll"]

variableName = "InCeinm"
