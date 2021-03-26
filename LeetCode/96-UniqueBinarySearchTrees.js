/*
96. Unique Binary Search Trees
Medium

Share
Given an integer n, return the number of structurally unique BST's (binary search trees) 
which has exactly n nodes of unique values from 1 to n.

Example 1:


Input: n = 3
Output: 5
Example 2:

Input: n = 1
Output: 1


Constraints:

1 <= n <= 19
*/

// const numTrees = (n) => {
//     if (n < 3) return n;
//     return 1
// };

/*
this is a trivia problem

Catalan number factorial equation: 2n!/((n+1) *!n!)
*/

var numTrees = function (n) {
    return factorial(2 * n) / (factorial(n + 1) * factorial(n));
};

function factorial(num) {
    if (num <= 0) return 1;
    return num * factorial(num - 1);
}