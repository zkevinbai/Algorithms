/*iterate from 0 to 100
if i is a multiple of 3, print fizz
if i is a multiple of 5, print buzz
if i is a multiple of both, print fizzbuzz
*/

const fizzbuzz = () => {

    for (let i = 1; i < 101; i++) {

        if (i % 5 === 0 && i % 3 === 0) {
            console.log("fizzbuzz")
        } else if (i % 5 === 0) {
            console.log("buzz")
        } else if (i % 3 === 0) {
            console.log("fizz")
        }
    }

}

// fizzbuzz();


/*
InputFolder
  Child1
    File1.docx
    File2.docx      
  Child2
    File1.docx
    File2.docx
    
OutputFolder
  Child1__File1.docx
  Child1__File2.docx
  Child2__File1.docx
  Child2__File2.docx
*/
// 
const inputFolder = {
    Child1: [
        "File1.docX",
        "File2.docX",
    ],
    Child2: [
        "File1.docX",
        "File2.docX",
    ],
}

// const output = [
//   "Child1___File1.docX",
// ]

const flatener = (input_dir, output_dir) => { // input, output objects
    const keys = Object.keys(input_dir);

    keys.forEach((key) => {
        const children = input_dir[key];

        children.forEach((child) => {
            const newChild = key + "__" + child;

            output_dir.push(newChild);
        })
    })

    console.log(output_dir);

    return output_dir;
}

// flatener(inputFolder, []);


/*

Given a keypad as shown in diagram, and a n digit number, list all words which are possible by pressing these numbers.
For example if input number is 234, possible words which can be formed are (Alphabetical order):
adg adh adi aeg aeh aei afg afh afi bdg bdh bdi beg beh bei bfg bfh bfi cdg cdh cdi ceg ceh cei cfg cfh cfi

  1  2  3
    ABC DEF

  4  5  6
 GHI JKL MNO

  7  8  9
PQRS TUV WXYZ

    0

Both recursive and iterative solutions are possible
*/

const num_2_strings = (n_digit) => {
    const numberDictionary = {
        0: [],
        1: [],
        2: ["a", "b", "c"],
        3: ["d", "e", "f"],
        4: ["g", "h", "i"],
        5: ["j", "k", "l"],
        6: ["m", "n", "o"],
        7: ["p", "q", "r", "s"],
        8: ["t", "u", "v"],
        9: ["w", "x", "y", "z"],
    };


    let stringNum = n_digit + "";

    // if string is length 1, return a array of its possible letters

    if (stringNum.length === 0) {
        return [];
    }

    if (stringNum.length === 1) {
        return numberDictionary[stringNum];
    }

    // 2 3

    let output = []; // ["a", "b", "c"]

    for (let i = 0; i < stringNum.length; i++) {
        const currentNum = stringNum[i]; // "3"

        const currentLetters = numberDictionary[currentNum]; "d, e, f"

        if (i === 0) {
            currentLetters.forEach((letter) => output.push(letter));
        } else {
            const newOutput = [];

            output.forEach((subCombination) => {

                currentLetters.forEach((currentLetter) => {

                    const newSubCombination = subCombination + currentLetter;
                    newOutput.push(newSubCombination);
                })
            })

            output = newOutput;
        }
    }

    console.log(output);
    return output;
}

// num_2_strings(234234);

const numberDictionary = {
    0: [],
    1: [],
    2: ["a", "b", "c"],
    3: ["d", "e", "f"],
    4: ["g", "h", "i"],
    5: ["j", "k", "l"],
    6: ["m", "n", "o"],
    7: ["p", "q", "r", "s"],
    8: ["t", "u", "v"],
    9: ["w", "x", "y", "z"],
};

const num_2_strings_recursive = (n_digit) => {

    let stringNum = n_digit + "";

    const currentNum = stringNum[0]; // "2"

    const currentLetters = numberDictionary[currentNum];  //"a b c"

    if (stringNum.length === 1) {
        // console.log(currentLetters)
        return currentLetters;
    }

    const helper = (current, newLetters) => {
        if (current.length === 0) {
            current = newLetters;
        } else {
            const newOutput = [];

            current.forEach((letter) => {
                newLetters.forEach((newLetter) => {
                    const newCombination = letter + newLetter;
                    newOutput.push(newCombination);
                })
            })
            current = newOutput;
        }

        return current;
    }

    const nextNumber = Number(stringNum.slice(1, stringNum.length));

    console.log(nextNumber);

    const nextLetters = num_2_strings_recursive(nextNumber);


    const output = helper(currentLetters, nextLetters);
    console.log(output);
    return output;
}

num_2_strings_recursive(234);
