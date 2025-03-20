/*
Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

Example 1:

Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
Example 2:

Input: n = 1
Output: ["()"]

Constraints:

1 <= n <= 8
*/
const generateParenthesis = (n) => {
    const list = [];
    backtrack(list, "", 0, 0, n);
    return list;
}

const backtrack = (
    list,
    string,
    openCount,
    closeCount,
    max,
) => {
    if (string.length === max * 2) {
        list.push(string);
        return;
    }

    if (openCount < max) {
        backtrack(list, string + "(", openCount + 1, closeCount, max);
    }

    if (closeCount < openCount) {
        backtrack(list, string + ")", openCount, closeCount + 1, max);
    }
}

/*
teaching
// n = 1;

const generateParenthesis = (n) => {
    const list = [];
    backtrack(list, "", 0, 0, n);
    return list;
}

const backtrack = (
    list,           // ['()']
    string,         // '()'
    openCount,      // 1
    closeCount,     // 1
    max,            // 1
) => {
    // string.length = 2
    if (string.length === max * 2) {
        list.push(string);
        return;
    }

    // openCount = 1
    if (openCount < max) {
        backtrack(list, string + "(", openCount + 1, closeCount, max);
    }

    // closeCount = 0
    if (closeCount < openCount) {
        backtrack(list, string + ")", openCount, closeCount + 1, max);
    }
}
// call stack
// 1
    // 2
        // 3
*/