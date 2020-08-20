/* 
Evaluate the value of an arithmetic expression in Reverse Polish Notation.

Valid operators are +, -, *, /. Each operand may be an integer or another expression.

Note:

Division between two integers should truncate toward zero.
The given RPN expression is always valid. That means the expression would always evaluate to a result and there won't be any divide by zero operation.
Example 1:

Input: ["2", "1", "+", "3", "*"]
Output: 9
Explanation: ((2 + 1) * 3) = 9
Example 2:

Input: ["4", "13", "5", "/", "+"]
Output: 6
Explanation: (4 + (13 / 5)) = 6
Example 3:

Input: ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]
Output: 22
Explanation:
  ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
= ((10 * (6 / (12 * -11))) + 17) + 5
= ((10 * (6 / -132)) + 17) + 5
= ((10 * 0) + 17) + 5
= (0 + 17) + 5
= 17 + 5
= 22

NOTES
n - 1 integers, where n is # of expressions

find indices of all operands
check left 2 indices
if both left 2 are numbers, evaluate

["4", "13", "5", "/", "+"]
+
/ 5
/
13 5
13${/}5

[4, 2, +]

 while array.length > 1
    check
*/

const calc = (op, left, right) => {
    if (op === "+") {
        return left + right;
    } else if (op === "-") {
        return left - right;
    } else if (op === "*") {
        return left * right;
    } else if (op === "/") {
        return left / right;
    }
};

const evalRPN = (tokens) => {
    const expression = tokens.slice(0);
    const stack = [];

    while (expression.length > 0) {
        const val = expression.shift();

        // if val is a number, push to stack
        if (parseInt(val) || parseInt(val) === 0) {
            stack.push(parseInt(val));

        // if val is not a number, calculate, and push result to stack
        } else {
            const prevOne = parseInt(stack.pop());
            const prevTwo = parseInt(stack.pop());

            const expressionValue = calc(val, prevTwo, prevOne);
            stack.push(expressionValue);
        }
    }

    return stack[0];
};

// for (let i = 0; i < expression.length; i++) {

//     const op = expression[i];
//     const leftOne = expression[i - 1];
//     const leftTwo = expression[i - 2];

//     if (parseInt(leftOne) && parseInt(leftTwo)) {
//         const value = calc(op, leftTwo, leftOne)
//     }

//     if (op === "+") {
//         return left + right;
//     } else if (op === "-") {
//         return left - right;
//     } else if (op === "*") {
//         return left * right;
//     } else if (op === "/") {
//         return left / right;
//     }

// }

 // can't have a space in middle
// can't have more than one of (+, -)
// can't have more than one of (.)
// (.) must have a number after it
// optional e, no other letters
// must have number or (-) before and after e