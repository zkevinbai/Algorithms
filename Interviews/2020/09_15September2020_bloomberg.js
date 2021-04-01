// array of integers
// 1 integer, sum
// create a function
// how many pairs can create the sum
// [2, 2] 4 , unique sum
// account for empty imput, negative input
// sum cannot be null

// object, keys are unique numbers
// sum - value === key in object
// { 2: true }
// object.keys(object)

// o(n2) 
// value, compare against all other values
// increment the sum count, for each pair that results in the sum

// 15 September 2020 Tuesday

const twoSum = (array, sum) => {
    const unique = {};
    let sumCount = 0;

    for (let i = 0; i < array.length; i++) {
        const value = array[i];
        if (unique[value]) {
            unique[value].push(i);
        } else {
            unique[value] = [i];
        }
    }

    const visited = {}
    for (let i = 0; i < array.length; i++) {
        const value = array[i];
        const difference = sum - value;

        if (!visited[value] && unique[difference]) {
            sumCount += unique[difference].length;
            visited[value] = true;
        }
    }

    return sumCount;
}

/*
Given a string which may contain brackets, definitely balanced ()
Write a function that returns an array of the innermost substrings 

a b cd ef

"ab(c(d)e)"      ->  ["d"]
"[a{{b}c}d(e)]"  ->  ["b"]
"((a)b(cd)ef)"    ->  ["a", "cd"]
"(ab[]c){d{e}}"  ->  ["", "e"]
"Hello, World!"  ->  ["Hello, World!"]

{
    1: ["", "e"]
}

count 'ab(c)de'

{
    0: [ab, de]
    1: [c]
}

let deepestLevel = 1;
*/

const innerStrings = (string) => {
    const array = string.split("");
    const levels = {};
    let currentLevel = 0;
    let deepestLevel = 0;
    let subString = [];

    for (let i = 0; i < array.length; i++) {
        const value = array[i];

        if (value === "(") {
            currentLevel += 1;
        } else if (value === ")") {
            currentLevel -= 1;
        } else {
            subString.push(value);
        }

        if (value === "(" || value === ")") {
            if (levels[currentLevel]) {
                levels[currentLevel].push(subString.join(""));
            } else {
                levels[currentLevel] = [subString.join("")];
            }
            subString = [];
        }

        if (currentLevel > deepestLevel) {
            deepestLevel = currentLevel;
        }
    }

    if (deepestLevel === 0) {
        return string;
    }

    return levels[deepestLevel];
}

// 3
// fraud detector, complex js logic
// fraud if different city, within same time period

// 4
// binary search an array
// ascending up until a point, descend from that point

// free museum access to entire city