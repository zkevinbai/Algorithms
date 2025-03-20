/*
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
*/

// this is a stack problem
// add values to stack, and pop them off as the pairs show up
// if the stack is empty at the end of the iteration, the string is valid


const isValid = (string) => {
    const array = string.split('')

    const bracketPairs = {
        ')': '(',
        '}': '{',
        ']': '[',
    }

    const stack = [];

    for (let i = 0; i < array.length; i++) {
        const value = array[i]
        const stackTop = stack[stack.length - 1]

        // console.log({value, stack, stackTop})

        if (stackTop && bracketPairs[value] === stackTop) {
            stack.pop()
        } else {
            stack.push(value)
        }

        // console.log(stack)
    }

    return stack.length === 0
}

const isValid2021 = (string) => {
    const array = string.split("");

    const leftBracketsPairs = {
        ')': '(',
        '}': '{',
        ']': '[',
    }

    const stack = [];

    for (let i = 0; i < array.length; i++) {
        const value = array[i];
        const stackValue = stack[0];

        if (leftBracketsPairs[value] &&
            leftBracketsPairs[value] === stackValue) {
            stack.shift();
        } else {
            stack.unshift(value);
        }
    }

    return stack.length === 0;
};