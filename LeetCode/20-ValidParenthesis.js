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
    const array = string.split("");

    const stack = [];

    for (let i = 0; i < array.length; i++) {
        const value = array[i];

        
    }


};