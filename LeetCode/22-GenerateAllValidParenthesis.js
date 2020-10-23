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
    const results = [];
    backtrack(results, "", 0, 0, n);
    return results;
}

const backtrack = (
    results,
    string,
    openCount,
    closeCount,
    max,
) => {
    if (string.length === max * 2) {
        results.push(string);
        return;
    }

    if (openCount < max) {
        backtrack(results, string + "(", openCount + 1, closeCount, max);
    }

    if (closeCount < openCount) {
        backtrack(results, string + ")", openCount, closeCount + 1, max);
    }
}